import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
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

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0

  const finalPrice = product.sale_price || product.price

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Produto esgotado')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      quantity: 1
    })

    toast.success('Adicionado ao carrinho!')
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={product.image}
          className="w-full h-full object-cover"
        />

        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              Esgotado
            </span>
          </div>
        )}

        {product.promo_active && discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 text-white text-xs rounded">
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">
          {product.name}
        </h3>

        <p className="text-gray-400 text-sm mb-3">
          {product.description}
        </p>

        {/* Price */}
        {product.sale_price ? (
          <>
            <p className="text-gray-500 line-through">
              R$ {product.price}
            </p>
            <p className="text-[#FF6B00] text-xl font-bold">
              R$ {product.sale_price}
            </p>
          </>
        ) : (
          <p className="text-[#FF6B00] text-xl font-bold">
            R$ {product.price}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full mt-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${
            product.stock <= 0
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-[#FF6B00] hover:bg-[#FF8C00] text-white'
          }`}
        >
          <ShoppingCart size={18} />
          {product.stock <= 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    </motion.div>
  )
}