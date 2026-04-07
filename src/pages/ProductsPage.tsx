import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

export default function ProductsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedModel, setSelectedModel] = useState<string>('all')

  const [allProducts, setAllProducts] = useState<any[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 🔥 BUSCA COM FILTRO FLEXÍVEL (FUNCIONA COM QUALQUER BANCO)
  const fetchProducts = async () => {
    let query = supabase
      .from('products')
      .select('id, name, model, price, sale_price, image, promo_active')

    // 🔹 FILTRO TIPO (H1, H4...)
    if (selectedCategory !== 'all') {
      query = query.or(
        `name.ilike.%${selectedCategory}%,model.ilike.%${selectedCategory}%`
      )
    }

    // 🔹 FILTRO MODELO
    if (selectedModel !== 'all') {
      query = query.or(
        `name.ilike.%${selectedModel}%,model.ilike.%${selectedModel}%`
      )
    }

    const { data, error } = await query

    if (error) {
      console.log('Erro Supabase:', error)
      return
    }

    const formatted = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name || '',
      description: p.model || '',
      price: Number(p.price) || 0,
      sale_price: p.sale_price ? Number(p.sale_price) : null,
      image: p.image || '',
      promo_active: p.promo_active || false
    }))

    setAllProducts(formatted)
  }

  // 🔥 ATUALIZA AUTOMATICAMENTE
  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, selectedModel])

  return (
    <div className="pt-20 min-h-screen">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] py-12 border-b border-[#FF6B00]/20">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
            Catálogo de Produtos
          </h1>
          <p className="text-xl text-gray-400">
            Encontre o LED perfeito para seu veículo
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* FILTROS */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#FF6B00]/20 sticky top-24">

              <h3 className="text-white font-bold text-xl mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-[#FF6B00]" />
                Filtros
              </h3>

              {/* 🔹 TIPO */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">
                  Tipo da Lâmpada
                </h4>

                {['all','H1','H4','H7','H8','H9','H11','HB3','HB4'].map((cat) => (
                  <label key={cat} className="flex items-center space-x-2 cursor-pointer mb-2">
                    <input
                      type="radio"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 accent-[#FF6B00]"
                    />
                    <span className="text-gray-400">
                      {cat === 'all' ? 'Todos' : cat}
                    </span>
                  </label>
                ))}
              </div>

              {/* 🔹 MODELO */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">
                  Modelo
                </h4>

                {[
                  'all',
                  'LED MULTICOLOR RESCAR',
                  'LED RESCAR',
                  'DUAL VISION'
                ].map((model) => (
                  <label key={model} className="flex items-center space-x-2 cursor-pointer mb-2">
                    <input
                      type="radio"
                      checked={selectedModel === model}
                      onChange={() => setSelectedModel(model)}
                      className="w-4 h-4 accent-[#FF6B00]"
                    />
                    <span className="text-gray-400">
                      {model === 'all' ? 'Todos' : model}
                    </span>
                  </label>
                ))}
              </div>

              {/* LIMPAR */}
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedModel('all')
                }}
                className="w-full py-2 border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white rounded-lg font-semibold transition-all duration-300"
              >
                Limpar Filtros
              </button>

            </div>
          </aside>

          {/* PRODUTOS */}
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
                </motion.div>
              ))}

            </div>

          </div>

        </div>
      </div>

      {/* MOBILE */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsFilterOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-[#1A1A1A] p-6"
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-white font-bold text-xl">Filtros</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}