'use client'
import { useEffect, useState } from 'react'
import axiosInstance from '@/services/axiosInstance'
import { useSearchParams, useRouter } from 'next/navigation'
import { Customer } from '@/types/dto'
import Image from 'next/image'
import profile from '@/assets/profile.png'

export default function CustomerPage() {
  const search = useSearchParams()
  const [customerId, setCustomerId] = useState<number | null>(
    Number(search.get('customerId')) || null,
  )
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [editedCustomer, setEditedCustomer] = useState<Customer>()
  const [isChanged, setIsChanged] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if (customerId) {
      axiosInstance
        .get(`/Customer/${customerId}`)
        .then((response) => {
          setCustomer(response.data)
          setEditedCustomer(response.data) // Initialize editedCustomer with fetched data
        })
        .catch((error) => console.error(error))
    } else {
      setEditedCustomer({
        name: '',
        email: '',
      })
    }
  }, [customerId])

  const handleInputChange = (field: keyof Customer, value: string) => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, [field]: value })
      setIsChanged(JSON.stringify(editedCustomer) !== JSON.stringify(customer))
    }
  }

  const handleSave = () => {
    setIsSaving(true); // Disable the button
    if (customerId && isChanged && editedCustomer) {
      axiosInstance
        .put(`/Customer/${customerId}`, editedCustomer)
        .then((response) => {
          setCustomer(editedCustomer) // Update customer data with edited data
          setIsChanged(false) // Reset change flag
        })
        .catch((error) => console.error(error))
    } else if (!customerId) {
      axiosInstance
        .post('/Customer', editedCustomer)
        .then((response) => {
          console.log(response.data)

          router.push(`/customer?customerId=${response.data.customerId}`)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <div className="bg-slate-700 p-2 fixed min-h-screen">
        <h1 className="text-center pb-6 text-lg font-semibold text-slate-400">
          {customerId ? 'Edit Customer' : 'Add New Customer'}
        </h1>
        <div className="flex flex-col p-2 border-2 rounded-lg text-slate-400">
          <Image
            width={512}
            height={512}
            alt="profile"
            className="border-2 max-w-[30%] max-h-[30%] bg-yellow-300 rounded-full z-0 m-auto object-cover object-center"
            src={profile}
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={editedCustomer?.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={editedCustomer?.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          {isChanged && (
            <button
              className="bg-teal-400 text-white font-bold rounded-full m-4"
              onClick={handleSave}
              disabled={isSaving}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
