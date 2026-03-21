import React from 'react'
import {Edit, Trash2, Star, Tag} from 'lucide-react'

interface ProductListProps {
  products: any[]
  loading: boolean
  onEdit: (product: any) => void
  onDelete: (productId: string) => void
}

export default function ProductList({ products, loading, onEdit, onDelete }: ProductListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF6B00] border-t-transparent"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Nenhum produto cadastrado ainda</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-xl overflow-hidden hover:border-[#FF6B00] transition-all duration-300 group"
        >
          {/* Image */}
          <div className="relative h-48 bg-[#0A0A0A] overflow-hidden">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                Sem imagem
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {product.promo_active && (
                <span className="px-3 py-1 bg-[#FF6B00] text-white text-xs font-bold rounded-full flex items-center gap-1 glow-orange">
                  <Tag className="w-3 h-3" />
                  PROMO
                </span>
              )}
              {product.featured && (
                <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  DESTAQUE
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-xs text-gray-400 mb-2">Modelo: {product.model}</p>
              <span className="inline-block px-2 py-1 bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-semibold rounded">
                {product.category}
              </span>
            </div>

            {/* Prices */}
            <div className="mb-4">
              {product.promo_active ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#FF6B00]">
                    R$ {product.sale_price?.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    R$ {product.price?.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-black text-white">
                  R$ {product.price?.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-4 pb-4 border-b border-[#FF6B00]/10">
              <p className="text-sm text-gray-400">
                Estoque: <span className="text-white font-semibold">{product.stock} unidades</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 py-2 px-4 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:glow-orange"
              >
                <Edit className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir este produto?')) {
                    onDelete(product._id)
                  }
                }}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
