import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {User, Mail, Calendar, LogOut, Shield} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AccountPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Erro ao sair:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 glow-orange">
            Minhaa Conta
          </h1>

          {/* Card Principal */}
          <div className="bg-[#1A1A1A] rounded-xl border border-[#FF6B00]/20 p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-full flex items-center justify-center glow-orange-strong">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user.userName || 'Usuário'}
                </h2>
                <p className="text-gray-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email || 'Não informado'}
                </p>
              </div>
            </div>

            {/* Informações da Conta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#FF6B00]/10">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-[#FF6B00]" />
                  <span className="text-gray-400 text-sm">Membro desde</span>
                </div>
                <p className="text-white font-semibold">
                  {user.createdTime ? new Date(user.createdTime).toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>

              <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#FF6B00]/10">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-[#FF6B00]" />
                  <span className="text-gray-400 text-sm">Status da Conta</span>
                </div>
                <p className="text-green-400 font-semibold">Ativa</p>
              </div>
            </div>

            {/* Botão de Sair */}
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              {loading ? 'Saindo...' : 'Sair da Conta'}
            </button>
          </div>

          {/* Seções Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] rounded-xl border border-[#FF6B00]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Meus Pedidos</h3>
              <p className="text-gray-400 mb-4">Acompanhe seus pedidos e histórico de compras</p>
              <button className="px-6 py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg font-semibold transition-all duration-300">
                Ver Pedidos
              </button>
            </div>

            <div className="bg-[#1A1A1A] rounded-xl border border-[#FF6B00]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Endereços</h3>
              <p className="text-gray-400 mb-4">Gerencie seus endereços de entrega</p>
              <button className="px-6 py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg font-semibold transition-all duration-300">
                Gerenciar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

