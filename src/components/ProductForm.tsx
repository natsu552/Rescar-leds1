import React, { useState, useEffect } from 'react'
import {X, Upload, Trash2} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface ProductFormProps {
  product?: any
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

const categories = ['H1', 'H3', 'H4', 'H7', 'H11', 'HB3', 'HB4', 'Pingo', 'Placa']

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    sale_price: product?.sale_price || '',
    promo_active: product?.promo_active || false,
    featured: product?.featured || false,
    category: product?.category || 'H7',
    model: product?.model || '',
    stock: product?.stock || '',
    images: product?.images || [],
    compatibility: product?.compatibility || [],
  })

  const [imageUrl, setImageUrl] = useState('')
  const [carModel, setCarModel] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl.trim()]
      }))
      setImageUrl('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }))
  }

  const handleAddCompatibility = () => {
    if (carModel.trim() && !formData.compatibility.includes(carModel.trim())) {
      setFormData(prev => ({
        ...prev,
        compatibility: [...prev.compatibility, carModel.trim()]
      }))
      setCarModel('')
    }
  }

  const handleRemoveCompatibility = (model: string) => {
    setFormData(prev => ({
      ...prev,
      compatibility: prev.compatibility.filter((m: string) => m !== model)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        creator: user?.userId || 'admin',
      }
      
      await onSubmit(submitData)
      onCancel()
    } catch (error) {
      console.error('Submit failed:', error)
      alert('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1A1A1A] border-b border-[#FF6B00]/20 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {product ? 'Editar Produto' : 'Adicionar Produto'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Produto *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Ex: LED H7 6000K Ultra Branco"
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Descrição *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Descreva as características e benefícios do produto..."
              rows={4}
              className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              required
            />
          </div>

          {/* Preços */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preço Normal (R$) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="189.90"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Preço Promocional (R$) *</label>
              <input
                type="number"
                name="sale_price"
                value={formData.sale_price}
                onChange={handleInputChange}
                placeholder="149.90"
                step="0.01"
                min="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                required
              />
            </div>
          </div>

          {/* Categoria, Modelo, Estoque */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Categoria *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Modelo *</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="RESCAR-H7-6K"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Estoque *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="50"
                min="0"
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
                required
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="promo_active"
                checked={formData.promo_active}
                onChange={handleInputChange}
                className="w-5 h-5 rounded bg-[#0A0A0A] border-[#FF6B00]/30 text-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              />
              <span className="text-sm font-medium text-gray-300">Promoção Ativa</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 rounded bg-[#0A0A0A] border-[#FF6B00]/30 text-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              />
              <span className="text-sm font-medium text-gray-300">Produto em Destaque</span>
            </label>
          </div>

          {/* Imagens */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Imagens *</label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Cole a URL da imagem"
                className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 hover:glow-orange flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Adicionar
              </button>
            </div>
            
            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {formData.images.map((img: string, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-[#FF6B00]/30"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Compatibilidade */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Carros Compatíveis *</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                placeholder="Ex: Honda Civic, Toyota Corolla"
                className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20"
              />
              <button
                type="button"
                onClick={handleAddCompatibility}
                className="px-6 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 hover:glow-orange"
              >
                Adicionar
              </button>
            </div>
            
            {formData.compatibility.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.compatibility.map((model: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-[#FF6B00]/30 rounded-full text-sm text-white"
                  >
                    {model}
                    <button
                      type="button"
                      onClick={() => handleRemoveCompatibility(model)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white rounded-lg font-semibold transition-all duration-300 border border-[#FF6B00]/30"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-[#FF6B00] hover:bg-[#FF8C00] text-white rounded-lg font-bold transition-all duration-300 hover:glow-orange-strong disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : product ? 'Atualizar Produto' : 'Salvar Produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
