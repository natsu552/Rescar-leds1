import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram } from 'lucide-react'

export default function ContactPage() {

  const whatsappNumber = "5562999999999" // 🔥 troca pelo seu
  const instagramUser = "seuinstagram" // 🔥 troca pelo seu

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank")
  }

  const openInstagram = () => {
    window.open(`https://instagram.com/${instagramUser}`, "_blank")
  }

  return (
    <div className="pt-20 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
              Fale Conosco
            </h1>
            <p className="text-gray-400 text-lg">
              Tire suas dúvidas ou faça seu pedido direto conosco
            </p>
          </motion.div>
        </div>
      </div>

      {/* BOTÕES */}
      <div className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">

        {/* WHATSAPP */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1A1A1A] p-8 rounded-xl border border-[#FF6B00]/20 text-center cursor-pointer"
          onClick={openWhatsApp}
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-white text-2xl font-bold mb-2">
            WhatsApp
          </h2>

          <p className="text-gray-400 mb-4">
            Atendimento rápido e direto
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
            Chamar no WhatsApp
          </button>
        </motion.div>

        {/* INSTAGRAM */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1A1A1A] p-8 rounded-xl border border-[#FF6B00]/20 text-center cursor-pointer"
          onClick={openInstagram}
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Instagram className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-white text-2xl font-bold mb-2">
            Instagram
          </h2>

          <p className="text-gray-400 mb-4">
            Veja nossos produtos e novidades
          </p>

          <button className="bg-[#FF6B00] hover:bg-[#FF8C00] text-white px-6 py-3 rounded-lg font-bold">
            Acessar Instagram
          </button>
        </motion.div>

      </div>

    </div>
  )
}