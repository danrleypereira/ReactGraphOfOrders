'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import axiosInstance from '@/_services/axiosInstance'
import { Order, Brand } from '@/types/dto'
import Link from 'next/link'
import Image from 'next/image'
import anchor from '@/assets/link_icon.png'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const search = useSearchParams()
  const [brandId] = useState<number>(Number(search.get('brandId')))
  const [brand, setBrand] = useState<Brand>()

  useEffect(() => {
    console.log({ brandId: brandId })

    if (brandId) {
      Promise.all([
        axiosInstance.get(`/Brand/${brandId}`),
        axiosInstance.get(`/Order?brandId=${brandId}`),
      ])
        .then(([brandResponse, ordersResponse]) => {
          setBrand(brandResponse.data)
          setOrders(ordersResponse.data)
        })
        .catch((error) => console.error(error))
    }
  }, [brandId])

  return (
    <div className="min-h-screen max-w-screen">
      <h1 className="text-center text-lg font-semibold text-slate-800">
        Orders for Brand {brandId}
      </h1>
      <div className="grid grid-cols-4 gap-4 p-8">
        {orders.map((order) => (
          <div key={order.orderId} className="p-2 border-b">
            <p>Id: {order.orderId}</p>
            <p>Brand: {brand?.brandName}</p>
            <Link className="inline-flex" href={`/customer?customerId=${order.customerId}`}>
              Customer: 
              {order.customerId}
              <Image
                src={anchor}
                width={20}
                height={20}
                alt="anchor icon"
              ></Image>
            </Link>
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
