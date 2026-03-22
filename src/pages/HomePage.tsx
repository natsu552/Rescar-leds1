import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Truck, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [promoProducts, setPromoProducts] = useState<any[]>([])
  const navigate = useNavigate()

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
      out_of_stock: p.out_of_stock === true, // 🔥 corrigido
      stock: p.stock || 0
    }))

    setPromoProducts(formatted)
  }

  // 🛒 SALVA + REDIRECIONA
  const addToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const exists = cart.find((item: any) => item.id === product.id)

    if (!exists) {
      cart.push(product)
      localStorage.setItem("cart", JSON.stringify(cart))
    }

    // 🔥 VAI PRO CARRINHO
    navigate('/carrinho')
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Ilumine sua presença
          </h1>

          <Link to="/produtos" className="bg-[#FF6B00] px-8 py-4 rounded-lg font-bold">
            Ver Ofertas
          </Link>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {promoProducts.map((product) => {
              const discount =
                product.promo_active && product.sale_price
                  ? Math.round(
                      ((product.price - product.sale_price) / product.price) * 100
                    )
                  : 0

              return (
                <motion.div key={product.id} className="relative">

                  {/* DESCONTO */}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      -{discount}%
                    </div>
                  )}

                  <ProductCard product={product} />

                  {/* 🔥 BOTÃO */}
                  <div className="mt-3">
                    {product.out_of_stock === true ? (
                      <button className="w-full bg-red-600 p-2 rounded font-bold cursor-not-allowed">
                        Esgotado
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-[#FF6B00] hover:bg-[#FF8C00] p-2 rounded font-bold transition"
                      >
                        Comprar
                      </button>
                    )}
                  </div>

                </motion.div>
              )
            })}

          </div>

        </div>
      </section>
    </div>
  )
}