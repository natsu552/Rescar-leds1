import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {Lock} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (items.length === 0) {
      navigate('/produtos')
    }
  }, [items, navigate])

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-8 h-8 text-[#FF6B00]" />
              <h1 className="text-4xl md:text-5xl font-black text-white glow-orange">
                Checkout Seguro
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Complete seu pedido em alguns passos
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] rounded-xl p-8 border border-[#FF6B00]/20 text-center"
        >
          <div className="w-16 h-16 bg-[#FF6B00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#FF6B00]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Funcionalidade em Desenvolvimento
          </h2>
          <p className="text-gray-400 mb-6">
            O sistema completo de checkout com integração de pagamento e cálculo de frete será implementado nas próximas fases do projeto.
          </p>
          <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#FF6B00]/10">
            <p className="text-white font-bold mb-2">Próximas Implementações:</p>
            <ul className="text-gray-400 text-sm space-y-2 text-left max-w-md mx-auto">
              <li>✓ Autenticação de usuário</li>
              <li>✓ Formulário de endereço com ViaCEP</li>
              <li>✓ Cálculo automático de frete</li>
              <li>✓ Integração com Stripe/Mercado Pago</li>
              <li>✓ Confirmação e e-mail automático</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
