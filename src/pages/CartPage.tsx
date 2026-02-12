import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Trash2, Plus, Minus, ShoppingBag, ArrowRight} from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-24 h-24 text-gray-700 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-white mb-4">Carrinho Vazio</h2>
          <p className="text-gray-400 mb-8">
            Você ainda não adicionou produtos ao seu carrinho
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#FF8C00] text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:glow-orange-strong"
          >
            <span>Ver Produtos</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
              Carrinho de Compras
            </h1>
            <p className="text-xl text-gray-400">
              {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1A1A1A] rounded-xl p-4 border border-[#FF6B00]/20 flex gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-[#FF6B00] text-xl font-black mb-2">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </p>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2 bg-[#0A0A0A] rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-[#FF6B00] rounded transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </button>
                      <span className="text-white font-bold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#FF6B00] rounded transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1">Subtotal</p>
                  <p className="text-white font-black text-xl">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A1A] rounded-xl p-6 border border-[#FF6B00]/20 sticky top-24"
            >
              <h3 className="text-white font-bold text-2xl mb-6">Resumo do Pedido</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Frete</span>
                  <span>Calcular no checkout</span>
                </div>
                <div className="border-t border-[#FF6B00]/20 pt-4">
                  <div className="flex justify-between text-white text-xl font-black">
                    <span>Total</span>
                    <span className="text-[#FF6B00]">R$ {total.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:glow-orange-strong mb-4"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/produtos"
                className="w-full py-3 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg font-semibold flex items-center justify-center transition-all duration-300"
              >
                Continuar Comprando
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
