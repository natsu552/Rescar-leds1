import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from '@/components/Footer'

import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import LoginPage from '@/pages/LoginPage'
import AdminPage from '@/pages/AdminPage'
import AccountPage from '@/pages/AccountPage'
import SearchPage from '@/pages/SearchPage'
import ContatoPage from '@/pages/ContatoPage' // 🔥 IMPORTANTE

import ProtectedRoute from '@/components/ProtectedRoute'
import { CartProvider } from '@/context/CartContext'

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col">
          
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produtos" element={<ProductsPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />

              {/* 🔥 NOVAS ROTAS */}
              <Route path="/conta" element={<AccountPage />} />
              <Route path="/busca" element={<SearchPage />} />
              <Route path="/contato" element={<ContatoPage />} />

            </Routes>
          </main>

          <Footer />

        </div>
      </CartProvider>
    </Router>
  )
}

export default App