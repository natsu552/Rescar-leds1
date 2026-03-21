import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {ShoppingCart, Menu, X, Search, User} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#FF6B00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-lg flex items-center justify-center group-hover:glow-orange-strong transition-all duration-300">
              <span className="text-white font-black text-xl">R</span>
            </div>
            <span className="text-2xl font-black text-white glow-orange">RESCAR</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium">
              Início
            </Link>
            <Link to="/produtos" className="text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium">
              Produtos
            </Link>
            <Link to="/sobre" className="text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium">
              Sobre
            </Link>
            <Link to="/contato" className="text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium">
              Contato
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-white hover:text-[#FF6B00] transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            
            <button className="hidden md:block p-2 text-white hover:text-[#FF6B00] transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>

            <Link 
              to="/carrinho" 
              className="relative p-2 text-white hover:text-[#FF6B00] transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B00] rounded-full text-xs font-bold flex items-center justify-center glow-orange-strong">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A1A1A] border-t border-[#FF6B00]/20"
          >
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/produtos" 
                className="block text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link 
                to="/sobre" 
                className="block text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/contato" 
                className="block text-white hover:text-[#FF6B00] transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
              <div className="pt-4 border-t border-[#FF6B00]/20 flex space-x-4">
                <button className="flex-1 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 hover:glow-orange-strong">
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
