import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*') // 🔥 SEM FILTRO

    if (error) {
      console.log("ERRO:", error)
      alert("Erro ao buscar produtos")
      return
    }

    console.log("PRODUTOS:", data)
    setProducts(data || [])
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative text-center">
          <h1 className="text-5xl text-white font-black">
            Ilumine sua presença
          </h1>
          <Link to="/produtos" className="bg-orange-500 px-6 py-3 mt-4 inline-block">
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl text-white mb-10 text-center">
            Produtos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <motion.div key={product.id}>
                <ProductCard product={product} />
              </motion.div>
            ))}

          </div>

        </div>
      </section>
    </div>
  )
}