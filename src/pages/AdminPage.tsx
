import React, { useState, useEffect } from 'react'
import {Plus, Package} from 'lucide-react'
import AdminSidebar from '@/components/AdminSidebar'
import ProductForm from '@/components/ProductForm'
import ProductList from '@/components/ProductList'
import { useProducts } from '@/hooks/useProducts'

export default function AdminPage() {
  const { products, total, loading, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleCreateProduct = async (data: any) => {
    await createProduct(data)
    setShowForm(false)
  }

  const handleUpdateProduct = async (data: any) => {
    if (editingProduct?._id) {
      await updateProduct(editingProduct._id, data)
      setEditingProduct(null)
    }
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
  }

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId)
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-[#1A1A1A] border-b border-[#FF6B00]/20 p-6 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-white mb-2 glow-orange">Gerenciar Produtos</h1>
                <p className="text-gray-400">Total de {total} produtos cadastrados</p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-bold transition-all duration-300 hover:glow-orange-strong"
              >
                <Plus className="w-5 h-5" />
                Adicionar Produto
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {loading && products.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF6B00] border-t-transparent"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-2xl">
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nenhum produto cadastrado</h3>
                <p className="text-gray-400 mb-6">Comece adicionando seu primeiro produto LED</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-bold transition-all duration-300 hover:glow-orange-strong"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Produto
                </button>
              </div>
            ) : (
              <ProductList
                products={products}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>

      {/* Create Product Modal */}
      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </div>
  )
}
