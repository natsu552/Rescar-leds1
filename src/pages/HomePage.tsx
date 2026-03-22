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
    const { data, error } = await supabase
      .from('products')
      .select('id, name, model, price, sale_price, image, featured, promo_active, out_of_stock')
      .eq('featured', true)

    if (error) {
      console.log(error)
      return
    }

    const formatted = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.model,
      price: Number(p.price),
      sale_price: p.sale_price ? Number(p.sale_price) : null,
      image: p.image,
      promo_active: p.promo_active,
      featured: p.featured,
      stock: p.stock || 0
    }))

    setPromoProducts(formatted)
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 glow-orange">
            Ilumine sua presença
          </h1>

          <Link 
            to="/produtos" 
            className="bg-[#FF6B00] px-8 py-4 rounded-lg font-bold text-white"
          >
            Ver Ofertas
          </Link>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl text-white text-center mb-12">
            Destaques
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoProducts.map((product, index) => (
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
      </section>
    </div>
  )
}