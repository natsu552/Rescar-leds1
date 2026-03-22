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
      .select('id, name, model, price, sale_price, image, featured, promo_active, out_of_stock') // 🔥 corrigido
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
      out_of_stock: p.out_of_stock === true, // 🔥 garante boolean correto
      stock: p.stock || 0
    }))

    setPromoProducts(formatted)
  }

  // 🛒 CARRINHO
  const addToCart = (product: any) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const exists = cart.find((item: any) => item.id === product.id)

    if (exists) {
      alert("Produto já está no carrinho 🛒")
      return
    }

    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))

    alert("Adicionado ao carrinho 🚀")
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            alt="Carro esportivo com LEDs"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 glow-orange leading-tight">
              Ilumine sua presença.<br />
              <span className="text-[#FF6B00]">Domine a noite.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              LEDs automotivos de alta performance para transformar seu veículo
            </p>
            <Link 
              to="/produtos" 
              className="inline-flex items-center space-x-2 bg-[#FF6B00] hover:bg-[#FF8C00] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:glow-orange-strong group"
            >
              <span>Ver Ofertas</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Alta Performance', desc: 'Até 300% mais luz' },
              { icon: Shield, title: 'Garantia', desc: '2 anos de cobertura' },
              { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
              { icon: Star, title: 'Qualidade', desc: 'Certificação ISO' }
            ].map((item, index) => (
              <motion.div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
              Ofertas Especiais
            </h2>
          </div>

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
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold z-10">
                      -{discount}%
                    </div>
                  )}

                  <ProductCard product={product} />

                
                    
                import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import toast from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  sale_price?: number
  image: string
  promo_active?: boolean
  stock: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Produto fora de estoque')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      image: product.image,
      quantity: 1
    })
    toast.success('Produto adicionado ao carrinho!')
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#FF6B00]/20 hover:border-[#FF6B00] transition-all duration-300 group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.promo_active && discount > 0 && (
          <div className="absolute top-3 right-3 bg-[#FF0000] text-white px-3 py-1 rounded-full text-sm font-bold glow-orange-strong">
            -{discount}%
          </div>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-[#FF6B00] text-white px-3 py-1 rounded-full text-xs font-bold">
            Últimas unidades
          </div>
        )}
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Esgotado</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
          ))}
          <span className="text-gray-400 text-sm ml-2">(4.9)</span>
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF6B00] transition-colors duration-200">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            {product.sale_price ? (
              <>
                <p className="text-gray-500 text-sm line-through">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-[#FF6B00] text-2xl font-black">
                  R$ {product.sale_price.toFixed(2).replace('.', ',')}
                </p>
              </>
            ) : (
              <p className="text-[#FF6B00] text-2xl font-black">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all duration-300 ${
            product.stock <= 0
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-[#FF6B00] hover:bg-[#FF8C00] text-white hover:glow-orange-strong'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{product.stock <= 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}</span>
        </button>
      </div>
    </motion.div>
  )
}
                  </div>

                </motion.div>
              )
            })}

          </div>

          <div className="text-center mt-12">
            <Link 
              to="/produtos" 
              className="inline-flex items-center space-x-2 border-2 border-[#FF6B00] text-white hover:bg-[#FF6B00] px-8 py-3 rounded-lg font-bold transition-all duration-300"
            >
              <span>Ver Todos os Produtos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}