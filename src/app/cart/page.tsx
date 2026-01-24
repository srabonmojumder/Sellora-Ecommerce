'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, itemCount, subtotal, tax, shipping, total, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-neutral-600 mb-8">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
            Shopping Cart
          </h1>
          <p className="text-neutral-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 shadow-soft"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-32 h-32 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-lg font-semibold text-neutral-900 hover:text-primary-500 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-neutral-600 mt-1">
                          {item.product.category}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-neutral-500" />
                      </button>
                    </div>

                    {/* Variations */}
                    {(item.selectedSize || item.selectedColor) && (
                      <div className="flex gap-4 mb-4 text-sm">
                        {item.selectedSize && (
                          <span className="text-neutral-600">
                            Size: <span className="font-medium text-neutral-900">{item.selectedSize}</span>
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="text-neutral-600">
                            Color: <span className="font-medium text-neutral-900">{item.selectedColor}</span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-neutral-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <p className="text-sm text-neutral-500">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-soft sticky top-24">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium text-neutral-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-600">Tax (10%)</span>
                  <span className="font-medium text-neutral-900">
                    {formatPrice(tax)}
                  </span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-neutral-900">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" fullWidth className="mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button variant="outline" size="lg" fullWidth>
                  Continue Shopping
                </Button>
              </Link>

              {/* Free Shipping Notice */}
              {shipping > 0 && subtotal < 100 && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700">
                    Add {formatPrice(100 - subtotal)} more to get free shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
