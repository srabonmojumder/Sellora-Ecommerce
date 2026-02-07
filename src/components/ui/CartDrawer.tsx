'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import Button from './Button'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[400px] bg-white z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#ebebeb]">
          <h2 className="text-[18px] font-bold text-[#000]">
            Shopping Cart ({itemCount})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:text-[#a749ff] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <ShoppingBag className="w-16 h-16 text-[#d5d5d5] mb-4" />
            <p className="text-[16px] font-medium text-[#000] mb-2">Your cart is empty</p>
            <p className="text-[14px] text-[#555] mb-6 text-center">
              Looks like you haven&apos;t added any items yet.
            </p>
            <Button onClick={onClose} size="md">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 sm:gap-4 pb-4 border-b border-[#ebebeb]">
                    <div className="relative w-20 h-20 bg-[#f6f6f6] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={onClose}
                        className="text-[14px] font-medium text-[#000] hover:text-[#a749ff] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="text-[12px] text-[#555] mt-0.5">
                          {item.selectedSize && `Size: ${item.selectedSize}`}
                          {item.selectedSize && item.selectedColor && ' / '}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#ebebeb]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#a749ff] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-[13px] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#555] hover:text-[#a749ff] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[14px] font-semibold text-[#000]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex-shrink-0 text-[#555] hover:text-[#ef4444] transition-colors self-start"
                      aria-label={`Remove ${item.product.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#ebebeb] px-4 sm:px-6 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[16px] font-bold text-[#000]">Subtotal</span>
                <span className="text-[18px] font-bold text-[#a749ff]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[12px] text-[#555]">
                Shipping & taxes calculated at checkout
              </p>
              <div className="space-y-2">
                <Link href="/checkout" onClick={onClose} className="block">
                  <Button size="lg" fullWidth>
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={onClose} className="block">
                  <Button variant="outline" size="md" fullWidth>
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
