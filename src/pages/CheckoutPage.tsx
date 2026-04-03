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

  const [shippingOptions, setShippingOptions] = useState<any[]>([])
  const [selectedShipping, setSelectedShipping] = useState<any>(null)
  const [loadingCep, setLoadingCep] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (items.length === 0) {
      navigate('/produtos')
    }
  }, [items, navigate])

  // 🚚 CALCULAR FRETE
  const handleCep = async (value: string) => {
    const cep = value.replace(/\D/g, '') // remove tudo que não for número
    setForm(prev => ({ ...prev, cep }))

    if (cep.length !== 8) return

    setLoadingCep(true)

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()

      if (data.erro) {
        alert('CEP inválido')
        setLoadingCep(false)
        return
      }

      setForm(prev => ({
        ...prev,
        address: data.logradouro || '',
        city: data.localidade || '',
        state: data.uf || ''
      }))

      // 📦 FRETE BASEADO NA REGIÃO (origem GO)
      const uf = data.uf
      let economico = 0
      let expresso = 0

      if (uf === 'GO') {
        economico = 12
        expresso = 22
      } else if (['DF', 'MT', 'MS'].includes(uf)) {
        economico = 18
        expresso = 30
      } else if (['SP', 'MG', 'RJ', 'ES'].includes(uf)) {
        economico = 22
        expresso = 38
      } else if (['PR', 'SC', 'RS'].includes(uf)) {
        economico = 28
        expresso = 45
      } else if (
        ['BA','PE','CE','RN','PB','AL','SE','PI','MA'].includes(uf)
      ) {
        economico = 35
        expresso = 55
      } else {
        economico = 45
        expresso = 70
      }

      // 🎯 FRETE GRÁTIS
      if (total > 299) {
        economico = 0
      }

      const options = [
        {
          id: 'economico',
          name: 'Frete Econômico',
          price: economico,
          time: '5 a 10 dias úteis'
        },
        {
          id: 'expresso',
          name: 'Frete Expresso',
          price: expresso,
          time: '1 a 4 dias úteis'
        }
      ]

      setShippingOptions(options)
      setSelectedShipping(options[0])
    } catch (err) {
      console.log(err)
      alert('Erro ao buscar CEP')
    }

    setLoadingCep(false)
  }

  const handleSubmit = () => {
    if (!selectedShipping) {
      alert('Selecione um frete')
      return
    }

    alert('Pedido finalizado 🚀')
  }

  return (
    <div className="pt-20 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <Lock className="w-8 h-8 text-[#FF6B00]" />
          <h1 className="text-4xl font-black text-white">
            Checkout Seguro
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-8">

        {/* FORM */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#FF6B00]/20">
          <h2 className="text-white text-xl font-bold mb-6">Endereço</h2>

          <div className="grid gap-4">

            <input
              placeholder="CEP"
              className="input"
              value={form.cep}
              onChange={e => handleCep(e.target.value)}
            />

            {loadingCep && (
              <p className="text-yellow-400 text-sm">Buscando CEP...</p>
            )}

            <input
              placeholder="Endereço"
              className="input"
              value={form.address}
              onChange={e =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Cidade"
                className="input"
                value={form.city}
                readOnly
              />

              <input
                placeholder="Estado"
                className="input"
                value={form.state}
                readOnly
              />
            </div>
          </div>

          {/* FRETE */}
          {shippingOptions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white font-bold mb-4">
                Escolha o Frete
              </h3>

              <div className="space-y-3">
                {shippingOptions.map(option => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedShipping(option)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      selectedShipping?.id === option.id
                        ? 'border-[#FF6B00] bg-[#FF6B00]/10'
                        : 'border-gray-700'
                    }`}
                  >
                    <div className="flex justify-between text-white font-bold">
                      <span>{option.name}</span>
                      <span>R$ {option.price}</span>
                    </div>

                    <p className="text-gray-400 text-sm">
                      {option.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RESUMO */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#FF6B00]/20">
          <h2 className="text-white text-xl font-bold mb-6">
            Seu Pedido
          </h2>

          <div className="space-y-3 mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-gray-300">
                <span>{item.name}</span>
                <span>R$ {item.price}</span>
              </div>
            ))}
          </div>

          {selectedShipping && (
            <div className="flex justify-between text-gray-300 mb-4">
              <span>Frete</span>
              <span>R$ {selectedShipping.price}</span>
            </div>
          )}

          <div className="border-t border-gray-700 pt-4 mb-6">
            <div className="flex justify-between text-white text-xl font-bold">
              <span>Total</span>
              <span>
                R$ {total + (selectedShipping?.price || 0)}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] p-3 rounded-lg font-bold text-white"
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      {/* STYLE */}
      <style>
        {`
          .input {
            background: #0A0A0A;
            border: 1px solid #FF6B00;
            padding: 12px;
            border-radius: 8px;
            color: white;
          }

          .input:focus {
            outline: none;
            border-color: #FF8C00;
          }
        `}
      </style>
    </div>
  )
}