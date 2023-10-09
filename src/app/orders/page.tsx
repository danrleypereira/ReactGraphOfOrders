'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axiosInstance from '@/services/axiosInstance'
import { Order } from '@/types/dto'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const search = useSearchParams()
  const [brandId] = useState<number>(Number(search.get('brandId')))

  useEffect(() => {
    console.log({ brandId: brandId })

    if (brandId) {
      axiosInstance
        .get(`/Order?brandId=${brandId}`)
        .then((response) => setOrders(response.data))
        .catch((error) => console.error(error))
    }
  }, [brandId])

  return (
    <div className='min-h-screen max-w-screen'>
      <h1 className='text-center text-lg font-semibold text-slate-800'>Orders for Brand {brandId}</h1>
      <div className="grid grid-cols-4 gap-4 p-8">
        {orders.map((order) => (
          <div key={order.orderId} className="p-2 border-b ">
            <p>Id: {order.orderId}</p>
            <p>Brand: {order.brandId}</p>
            <p>Customer: {order.customerId}</p>
            <p>
              Date:{' '}
              {new Date(order.orderDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            {/* Render other order properties as needed */}
          </div>
        ))}
      </div>
    </div>
  )
}
