'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Product, WishlistItem } from '@/types'

interface WishlistContextType {
  items: WishlistItem[]
  itemCount: number
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const savedWishlist = localStorage.getItem('sellora-wishlist')
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error('Failed to parse wishlist data:', error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('sellora-wishlist', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToWishlist = (product: Product) => {
    setItems((prev) => {
      if (prev.some((item) => item.product.id === product.id)) {
        return prev
      }
      return [
        ...prev,
        {
          id: product.id,
          product,
          addedAt: new Date().toISOString(),
        },
      ]
    })
  }

  const removeFromWishlist = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.product.id === productId)
  }

  const clearWishlist = () => {
    setItems([])
  }

  const itemCount = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
