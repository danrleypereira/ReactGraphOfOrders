'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category, Product, Brand } from '@/types/dto'
import axiosInstance from '@/_services/axiosInstance'

export default function Brand() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [brands, setBrands] = useState<Brand[]>([])
  const router = useRouter()

  useEffect(() => {
    axiosInstance
      .get('/Category/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (selectedCategory !== null) {
      axiosInstance
        .get(`/Product/products-by-category?categoryId=${selectedCategory}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.error(error))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedProduct !== null) {
      // Assuming you have a selectedProduct state
      axiosInstance
        .get(`/Brand/brands-by-product?productId=${selectedProduct}`)
        .then((response) => setBrands(response.data))
        .catch((error) => console.error(error))
    }
  }, [selectedProduct])

  return (
    <div className='min-h-screen max-w-screen min-w-screen'>
      <h1 className='text-center text-lg font-semibold text-slate-800'>Brand list</h1>
      <div className="flex justify-center">
        <div className=' m-10'>
          <label htmlFor="categorySelect">Select Category:</label>
          <select
            name="categorySelect"
            id="categorySelect"
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="mb-4 mx-4 p-2 border-2  border-r-4 border-cyan-200"
          >
            <option key={"category.categoryId"} value="">
                {" "}
              </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className=' m-10'>
          <label htmlFor="productSelect">Select Product:</label>
          <select
            name="productSelect"
            id="productSelect"
            onChange={(e) => setSelectedProduct(Number(e.target.value))}
            className="mb-4 mx-4 p-2 border-2  border-r-4 border-cyan-200"
          >
            <option key="product.productId" value="">
                {" "}
              </option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.productName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {brands.map((brand) => (
          <div
            key={brand.brandId}
            className="p-2 border-b cursor-pointer"
            onClick={() =>
              router.push(`/orders?brandId=${brand.brandId}`)
            }
          >
            {brand.brandName}
          </div>
        ))}
      </div>
    </div>
  )
}
