import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const { items, total } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    city: '',
    state: ''
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    if (items.length === 0) {
      navigate('/produtos')
    }
  }, [items, navigate])

  // 🔥 BUSCAR CEP AUTOMÁTICO
  const handleCep = async (cep: string) => {
    setForm({ ...form, cep })

    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await res.json()

        if (!data.erro) {
          setForm(prev => ({
            ...prev,
            address: data.logradouro,
            city: data.localidade,
            state: data.uf
          }))
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleSubmit = () => {
    alert('Pedido finalizado (simulação) 🚀')
    // 🔥 Aqui depois entra Stripe ou Mercado Pago
  }

  return (
    <div className="pt-20 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-[#FF6B00]" />
              <h1 className="text-4xl font-black text-white">
                Checkout Seguro
              </h1>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">

        {/* 🧾 FORMULÁRIO */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#FF6B00]/20">

          <h2 className="text-xl font-bold text-white mb-6">
            Dados do Cliente
          </h2>

          <div className="grid gap-4">

            <input
              placeholder="Nome completo"
              className="input"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="Email"
              className="input"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Telefone"
              className="input"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <input
              placeholder="CEP"
              className="input"
              value={form.cep}
              onChange={e => handleCep(e.target.value)}
            />

            <input
              placeholder="Endereço"
              className="input"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Cidade"
                className="input"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
              />

              <input
                placeholder="Estado"
                className="input"
                value={form.state}
                onChange={e => setForm({ ...form, state: e.target.value })}
              />
            </div>

          </div>
        </div>

        {/* 🛒 RESUMO */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#FF6B00]/20">

          <h2 className="text-xl font-bold text-white mb-6">
            Seu Pedido
          </h2>

          <div className="space-y-4 mb-6">

            {items.map(item => (
              <div key={item.id} className="flex justify-between text-gray-300">
                <span>{item.name}</span>
                <span>R$ {item.price}</span>
              </div>
            ))}

          </div>

          <div className="border-t border-gray-700 pt-4 mb-6">
            <div className="flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span>R$ {total}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] p-3 rounded-lg font-bold text-white transition"
          >
            Finalizar Compra
          </button>

        </div>
      </div>

      {/* 🎨 STYLE PADRÃO INPUT */}
      <style>
        {`
          .input {
            background: #0A0A0A;
            border: 1px solid #FF6B00;
            padding: 12px;
            border-radius: 8px;
            color: white;
            outline: none;
          }

          .input::placeholder {
            color: #666;
          }

          .input:focus {
            border-color: #FF8C00;
            box-shadow: 0 0 0 1px #FF6B00;
          }
        `}
      </style>

    </div>
  )
}