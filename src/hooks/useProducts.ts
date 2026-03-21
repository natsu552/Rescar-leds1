import { useState } from 'react'
import { lumi } from '@/lib/lumi'

export function useProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async (options?: {
    filter?: Record<string, any>
    sort?: Record<string, 1 | -1>
    limit?: number
    skip?: number
  }) => {
    setLoading(true)
    try {
      const { list, total } = await lumi.entities.products.list(options)
      setProducts(list)
      setTotal(total)
      console.log('Products fetched:', list)
    } catch (error) {
      console.error('Fetch products failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (data: any) => {
    try {
      // Process form data to ensure correct types
      const processedData = {
        ...data,
        price: typeof data.price === 'string' ? parseFloat(data.price) : data.price,
        sale_price: typeof data.sale_price === 'string' ? parseFloat(data.sale_price) : data.sale_price,
        stock: typeof data.stock === 'string' ? parseInt(data.stock) : data.stock,
        promo_active: data.promo_active === 'true' || data.promo_active === true,
        featured: data.featured === 'true' || data.featured === true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const newProduct = await lumi.entities.products.create(processedData)
      console.log('Product created:', newProduct)
      await fetchProducts()
      return newProduct
    } catch (error) {
      console.error('Create product failed:', error)
      throw error
    }
  }

  const updateProduct = async (id: string, updates: any) => {
    if (typeof id !== 'string') {
      throw new Error('ID must be a string')
    }

    try {
      // Process updates to ensure correct types
      const processedUpdates = {
        ...updates,
        price: typeof updates.price === 'string' ? parseFloat(updates.price) : updates.price,
        sale_price: typeof updates.sale_price === 'string' ? parseFloat(updates.sale_price) : updates.sale_price,
        stock: typeof updates.stock === 'string' ? parseInt(updates.stock) : updates.stock,
        promo_active: updates.promo_active === 'true' || updates.promo_active === true,
        featured: updates.featured === 'true' || updates.featured === true,
        updatedAt: new Date().toISOString(),
      }

      const updated = await lumi.entities.products.update(id, processedUpdates)
      console.log('Product updated:', updated)
      await fetchProducts()
      return updated
    } catch (error) {
      console.error('Update product failed:', error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    if (typeof id !== 'string' || id === '[object Object]') {
      throw new Error('Invalid ID: must be a string, not an object')
    }

    try {
      await lumi.entities.products.delete(id)
      console.log('Product deleted:', id)
      await fetchProducts()
    } catch (error) {
      console.error('Delete product failed:', error)
      throw error
    }
  }

  return {
    products,
    total,
    loading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
