import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {LayoutDashboard, Package, ShoppingCart, Settings, LogOut} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminSidebar() {
  const location = useLocation()
  const { user, signOut } = useAuth()

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Produtos', path: '/admin/produtos', icon: Package },
    { name: 'Pedidos', path: '/admin/pedidos', icon: ShoppingCart },
    { name: 'Configurações', path: '/admin/config', icon: Settings },
  ]

  return (
    <aside className="w-64 bg-[#1A1A1A] border-r border-[#FF6B00]/20 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#FF6B00]/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-lg flex items-center justify-center glow-orange-strong">
            <span className="text-white font-black text-xl">R</span>
          </div>
          <div>
            <h2 className="text-xl font-black text-white glow-orange">RESCAR</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#FF6B00] text-white glow-orange'
                  : 'text-gray-400 hover:text-white hover:bg-[#0A0A0A]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-[#FF6B00]/20">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{user?.userName?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.userName}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            signOut()
            window.location.href = '/'
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[#0A0A0A] hover:bg-red-600 text-gray-400 hover:text-white rounded-lg transition-all duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
