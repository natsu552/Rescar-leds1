import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {Search, X} from 'lucide-react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import ProductCard from '@/components/ProductCard'
import { useProducts } from '@/hooks/useProducts'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const { products, loading, fetchProducts } = useProducts()

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase()) ||
    product.category?.toLowerCase().includes(query.toLowerCase()) ||
    product.model?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pt-20 min-h-screen bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Barra de Busca */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full py-4 px-6 bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="p-2 bg-[#FF6B00] hover:bg-[#FF8C00] rounded-lg text-white transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>

          {/* Resultados */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 glow-orange">
              {query ? `Resultados para "${query}"` : 'Buscar Produtos'}
            </h1>
            <p className="text-gray-400">
              {loading ? (
                'Carregando produtos...'
              ) : query ? (
                <>
                  Encontrados <span className="text-white font-semibold">{filteredProducts.length}</span> produtos
                </>
              ) : (
                'Digite algo para buscar'
              )}
            </p>
          </div>

          {/* Grid de Produtos */}
          {!loading && query && filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-400 mb-6">
                Tente buscar por outro termo ou categoria
              </p>
              <button
                onClick={() => navigate('/produtos')}
                className="px-8 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 glow-orange-strong"
              >
                Ver Todos os Produtos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
