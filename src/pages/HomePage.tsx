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
      .select('*')

    if (error) {
      console.log("ERRO:", error)
      return
    }

    console.log("DADOS BRUTOS:", data)

    const formatted = (data || [])
      .filter(p => p.promo_active === true && p.featured === true)
      .map((p: any) => ({
        id: p.id,

        // 🔥 COMPATIBILIDADE TOTAL
        title: p.name,
        name: p.name,

        description: p.model,
        model: p.model,

        price: Number(p.price),
        salePrice: p.sale_price ? Number(p.sale_price) : null,
        sale_price: p.sale_price ? Number(p.sale_price) : null,

        image: p.image,
        images: p.image ? [p.image] : [],

        promo_active: p.promo_active,
        featured: p.featured,
        stock: p.stock || 0
      }))

    console.log("FORMATADO:", formatted)

    setPromoProducts(formatted)
  }

  return (
    <div className="pt-20">
      {/* HERO (NÃO ALTERADO) */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Ilumine sua presença
          </h1>

          <Link 
            to="/produtos"
            className="bg-[#FF6B00] px-8 py-4 rounded-lg text-white font-bold"
          >
            Ver Ofertas
          </Link>
        </div>
      </section>

      {/* BENEFÍCIOS (NÃO ALTERADO) */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          {[
            { icon: Zap, title: 'Alta Performance', desc: 'Até 300% mais luz' },
            { icon: Shield, title: 'Garantia', desc: '2 anos' },
            { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
            { icon: Star, title: 'Qualidade', desc: 'ISO' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <item.icon className="text-white mx-auto mb-2" />
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl text-white text-center mb-12">
            Ofertas Especiais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {promoProducts.map((product) => {
              const discount =
                product.salePrice
                  ? Math.round(
                      ((product.price - product.salePrice) / product.price) * 100
                    )
                  : 0

              return (
                <div key={product.id} className="relative">

                  {/* 🔥 BADGE DESCONTO */}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold z-10">
                      -{discount}%
                    </div>
                  )}

                  <ProductCard product={product} />
                </div>
              )
            })}

          </div>

        </div>
      </section>
    </div>
  )
}