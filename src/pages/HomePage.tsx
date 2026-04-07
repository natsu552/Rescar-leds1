import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [promoProducts, setPromoProducts] = useState<any[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    // 🔥 PRIMEIRO: tenta pegar produtos em destaque
    const { data, error } = await supabase
      .from('products')
      .select('id, name, model, price, sale_price, image, featured, promo_active')
      .eq('featured', true)

    if (error) {
      console.log(error)
      return
    }

    // 🔥 SE NÃO TIVER NENHUM → pega produtos normais
    let finalData = data

    if (!data || data.length === 0) {
      const { data: fallback } = await supabase
        .from('products')
        .select('id, name, model, price, sale_price, image, featured, promo_active')
        .limit(8)

      finalData = fallback
    }

    const formatted = (finalData || []).map((p: any) => ({
      id: p.id,
      name: p.name || '',
      description: p.model || '',
      price: Number(p.price) || 0,
      sale_price: p.sale_price ? Number(p.sale_price) : null,
      image: p.image || '',
      promo_active: p.promo_active || false,
      featured: p.featured || false
    }))

    setPromoProducts(formatted)
  }

  return (
    <div className="pt-20">

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            alt="Carro esportivo"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white mb-6">
            Ilumine sua presença
          </h1>

          <Link 
            to="/produtos"
            className="bg-[#FF6B00] px-8 py-4 rounded-lg text-white font-bold"
          >
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl text-white font-bold mb-10 text-center">
            Produtos em Destaque
          </h2>

          {/* 🔥 SE NÃO TIVER PRODUTO */}
          {promoProducts.length === 0 && (
            <p className="text-center text-gray-400">
              Nenhum produto encontrado
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {promoProducts.map((product, index) => {
              const discount =
                product.promo_active && product.sale_price
                  ? Math.round(
                      ((product.price - product.sale_price) / product.price) * 100
                    )
                  : 0

              return (
                <motion.div key={product.id} className="relative">

                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      -{discount}%
                    </div>
                  )}

                  <ProductCard product={product} />

                </motion.div>
              )
            })}

          </div>

          <div className="text-center mt-12">
            <Link 
              to="/produtos"
              className="border border-[#FF6B00] px-6 py-3 rounded text-white"
            >
              Ver todos
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}