import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

  const [items, setItems] = useState<CartItem[]>([])

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  // 🔥 CARREGAR DO BANCO OU LOCAL
  useEffect(() => {
    if (user) {
      loadCartFromSupabase()
    } else {
      const saved = localStorage.getItem('rescar-cart')
      setItems(saved ? JSON.parse(saved) : [])
    }
  }, [])

  // 🔥 SALVAR NO LOCAL (fallback)
  useEffect(() => {
    localStorage.setItem('rescar-cart', JSON.stringify(items))
  }, [items])

  // 🚀 BUSCAR DO SUPABASE
  const loadCartFromSupabase = async () => {
    const { data, error } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', user.id)

    if (error) {
      console.log(error)
      return
    }

    const formatted = (data || []).map((item: any) => ({
      id: item.product_id,
      name: item.name,
      price: item.price,
      image: item.image || '',
      quantity: item.quantity
    }))

    setItems(formatted)
  }

  // ➕ ADICIONAR
  const addItem = async (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
      }

      return [...prev, item]
    })

    // 🔥 SALVAR NO SUPABASE
    if (user) {
      await supabase.from('carts').insert([
        {
          user_id: user.id,
          product_id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }
      ])
    }
  }

  // ❌ REMOVER
  const removeItem = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))

    if (user) {
      await supabase
        .from('carts')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', id)
    }
  }

  // 🔄 ATUALIZAR QUANTIDADE
  const updateQuantity = async (id: string, quantity: number) => {
    const newQty = Math.max(1, quantity)

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: newQty } : i
      )
    )

    if (user) {
      await supabase
        .from('carts')
        .update({ quantity: newQty })
        .eq('user_id', user.id)
        .eq('product_id', id)
    }
  }

  // 🧹 LIMPAR
  const clearCart = async () => {
    setItems([])

    if (user) {
      await supabase
        .from('carts')
        .delete()
        .eq('user_id', user.id)
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}