import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom' // 🔥 NOVO
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  const navigate = useNavigate() // 🔥 NOVO

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 🛒 FUNÇÃO DO CARRINHO
  const addToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const exists = cart.find((item: any) => item.id === product.id)

    if (!exists) {
      cart.push(product)
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    navigate('/carrinho') // 🔥 REDIRECIONA
  }

  // Mock de produtos
  const allProducts = [
    {
      id: '1',
      name: 'LED H4 6000K Premium',
      description: 'Super brilho, vida útil de 50.000 horas',
      price: 299.90,
      sale_price: 199.90,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
      category: 'H4',
      promo_active: true,
      stock: 15,
      out_of_stock: false // 🔥 IMPORTANTE
    },
    {
      id: '2',
      name: 'LED H7 8000K Racing',
      description: 'Luz branca azulada, estilo racing premium',
      price: 349.90,
      sale_price: 249.90,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500',
      category: 'H7',
      promo_active: true,
      stock: 8,
      out_of_stock: false
    },
    {
      id: '3',
      name: 'LED H11 Canbus',
      description: 'Anti-erro, compatível com todos os carros',
      price: 279.90,
      sale_price: 189.90,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
      category: 'H11',
      promo_active: true,
      stock: 20,
      out_of_stock: false
    },
    {
      id: '4',
      name: 'Kit LED HB3/HB4',
      description: 'Farol alto e baixo, 12000 lumens',
      price: 549.90,
      sale_price: 399.90,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
      category: 'HB',
      promo_active: true,
      stock: 5,
      out_of_stock: true // 🔥 exemplo esgotado
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-black text-white mb-4">
            Catálogo de Produtos
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >

              <ProductCard product={product} />

              {/* 🔥 BOTÃO IGUAL HOME */}
              <div className="mt-3">
                {product.out_of_stock === true ? (
                  <button className="w-full bg-red-600 p-3 rounded-lg font-bold cursor-not-allowed">
                    Esgotado
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] p-3 rounded-lg font-bold transition"
                  >
                    Comprar
                  </button>
                )}
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </div>
  )
}