import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowRight, Zap, Shield, Truck, Star} from 'lucide-react'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Mock de produtos em promoção
  const promoProducts = [
    {
      id: '1',
      name: 'LED H4 6000K Premium',
      description: 'Super brilho, vida útil de 50.000 horas',
      price: 299.90,
      sale_price: 199.90,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500',
      promo_active: true,
      stock: 15
    },
    {
      id: '2',
      name: 'LED H7 8000K Racing',
      description: 'Luz branca azulada, estilo racing premium',
      price: 349.90,
      sale_price: 249.90,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500',
      promo_active: true,
      stock: 8
    },
    {
      id: '3',
      name: 'LED H11 Canbus',
      description: 'Anti-erro, compatível com todos os carros',
      price: 279.90,
      sale_price: 189.90,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
      promo_active: true,
      stock: 20
    },
    {
      id: '4',
      name: 'Kit LED HB3/HB4',
      description: 'Farol alto e baixo, 12000 lumens',
      price: 549.90,
      sale_price: 399.90,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
      promo_active: true,
      stock: 5
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920" 
            alt="Carro esportivo com LEDs"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-[#FF6B00] rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-[#FF6B00] rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'Alta Performance', desc: 'Até 300% mais luz' },
              { icon: Shield, title: 'Garantia', desc: '2 anos de cobertura' },
              { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
              { icon: Star, title: 'Qualidade', desc: 'Certificação ISO' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-full flex items-center justify-center mx-auto mb-4 glow-orange-strong">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Promoção */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 glow-orange">
              Ofertas Especiais
            </h2>
            <p className="text-xl text-gray-400">
              Produtos selecionados com até 40% de desconto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promoProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/produtos" 
              className="inline-flex items-center space-x-2 border-2 border-[#FF6B00] text-white hover:bg-[#FF6B00] px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:glow-orange-strong"
            >
              <span>Ver Todos os Produtos</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B00] to-[#FF0000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Pronto para transformar seu carro?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Junte-se a milhares de clientes satisfeitos e experimente a diferença
          </p>
          <Link 
            to="/produtos" 
            className="inline-flex items-center space-x-2 bg-black hover:bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
