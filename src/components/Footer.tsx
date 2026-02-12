import React from 'react'
import { Link } from 'react-router-dom'
import {Facebook, Instagram, Youtube, Mail, Phone, MapPin} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#FF6B00]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B00] to-[#FF0000] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">R</span>
              </div>
              <span className="text-2xl font-black text-white glow-orange">RESCAR</span>
            </div>
            <p className="text-gray-400 text-sm">
              Ilumine sua presença. Domine a noite com os melhores LEDs automotivos do mercado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/garantia" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Garantia
                </Link>
              </li>
              <li>
                <Link to="/instalacao" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Guia de Instalação
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-white font-bold mb-4">Atendimento</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/trocas" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/frete" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Política de Frete
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-[#FF6B00] transition-colors duration-200 text-sm">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-4 h-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">contato@rescar.com.br</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-4 h-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-[#FF6B00] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FF6B00]/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RESCAR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
