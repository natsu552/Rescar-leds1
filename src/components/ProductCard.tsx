import React from 'react'
import { motion } from 'framer-motion'
import {ShoppingCart, Star} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  sale_price?: number
  image: string
  promo_active?: boolean
  stock: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Produto fora de estoque')
      return
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      image: product.image,
      quantity: 1
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.promo_active && discount > 0 && (
          <div className="absolute top-3 right-3 bg-[#FF0000] text-white px-3 py-1 rounded-full text-sm font-bold glow-orange-strong">
            -{discount}%
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-bold">
            Últimas unidades
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Esgotado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
          ))}
          <span className="text-gray-400 text-sm ml-2">(4.9)</span>
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF6B00] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            {product.sale_price ? (
              <>
                <p className="text-gray-500 text-sm line-through">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-[#FF6B00] text-2xl font-black">
                  R$ {product.sale_price.toFixed(2).replace('.', ',')}
                </p>
              </>
            ) : (
              <p className="text-[#FF6B00] text-2xl font-black">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${
            product.stock <= 0
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-[#FF6B00] hover:bg-[#FF8C00] text-white hover:glow-orange-strong'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.stock <= 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}</span>
        </button>
      </div>
    </motion.div>
  )
}
