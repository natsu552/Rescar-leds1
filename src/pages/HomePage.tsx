import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<string>('all')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
      out_of_stock: false
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
      out_of_stock: true
    },
    {
      id: '5',
      name: 'LED H1 10000K',
      description: 'Luz ultra branca, design compacto',
      price: 249.90,
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500',
      category: 'H1',
      promo_active: false,
      stock: 12,
      out_of_stock: false
    },
    {
      id: '6',
      name: 'LED H3 Neblina',
      description: 'Ideal para faróis de neblina',
      price: 189.90,
      image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500',
      category: 'H3',
      promo_active: false,
      stock: 18,
      out_of_stock: false
    }
  ]

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
              Catálogo de Produtos
            </h1>
            <p className="text-xl text-gray-400">
              Encontre o LED perfeito para seu veículo
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Produtos */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Mostrando <span className="text-white font-semibold">{allProducts.length}</span> produtos
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />

                  {/* 🔥 BOTÃO (APENAS VISUAL) */}
                  <div className="mt-3">
                    {product.out_of_stock === true ? (
                      <button className="w-full bg-red-600 p-3 rounded-lg font-bold cursor-not-allowed">
                        Esgotado
                      </button>
                    ) : (
                      <button className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] p-3 rounded-lg font-bold transition">
                        Comprar
                      </button>
                    )}
                  </div>

                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsFilterOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-[#1A1A1A] p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-xl">Filtros</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all')
                setPriceRange('all')
                setIsFilterOpen(false)
              }}
              className="w-full py-3 bg-[#FF6B00] text-white rounded-lg font-semibold"
            >
              Aplicar Filtros
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}