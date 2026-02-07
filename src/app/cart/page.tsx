'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
  const { items, itemCount, subtotal, tax, shipping, total, updateQuantity, removeFromCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#f6f6f6]">
          <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Shopping Cart</h1>
            <nav className="flex items-center justify-center gap-2 text-[14px]">
              <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#555]" />
              <span className="text-[#a749ff]">Cart</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 text-[#d5d5d5] mx-auto mb-6" />
          <h2 className="text-[28px] font-bold text-[#000] mb-4">
            Your cart is empty
          </h2>
          <p className="text-[15px] text-[#555] mb-8">
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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Shopping Cart</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Cart Table Header - Desktop */}
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-[#ebebeb] mb-6">
              <div className="col-span-6 text-[14px] font-semibold text-[#000] uppercase tracking-wide">
                Product
              </div>
              <div className="col-span-2 text-[14px] font-semibold text-[#000] uppercase tracking-wide text-center">
                Price
              </div>
              <div className="col-span-2 text-[14px] font-semibold text-[#000] uppercase tracking-wide text-center">
                Quantity
              </div>
              <div className="col-span-2 text-[14px] font-semibold text-[#000] uppercase tracking-wide text-right">
                Total
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 pb-6 border-b border-[#ebebeb] items-center"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#f6f6f6] flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-[16px] font-medium text-[#000] hover:text-[#a749ff] transition-colors mb-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[13px] text-[#555] mb-2">
                        {item.product.category}
                      </p>
                      {(item.selectedSize || item.selectedColor) && (
                        <div className="flex gap-3 text-[13px] text-[#555]">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        </div>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-[13px] text-[#555] hover:text-[#a749ff] transition-colors flex items-center gap-1 sm:hidden"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price - visible on mobile too */}
                  <div className="sm:col-span-2 text-center">
                    <span className="text-[15px] text-[#000] sm:block">
                      <span className="sm:hidden text-[13px] text-[#555] mr-1">Price:</span>
                      {formatPrice(item.product.price)}
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex justify-center">
                    <div className="flex items-center border border-[#ebebeb]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#555] hover:text-[#a749ff] hover:bg-[#f6f6f6] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-[15px] font-medium text-[#000]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-[#555] hover:text-[#a749ff] hover:bg-[#f6f6f6] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-[16px] font-semibold text-[#000]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="hidden sm:flex w-8 h-8 items-center justify-center text-[#555] hover:text-[#a749ff] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-8">
              <Link
                href="/shop"
                className="text-[14px] text-[#555] hover:text-[#a749ff] transition-colors inline-flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f6f6f6] p-6 sm:p-8 sticky top-36">
              <h2 className="text-[20px] font-bold text-[#000] mb-6 pb-4 border-b border-[#ebebeb]">
                Cart Totals
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#555]">Subtotal</span>
                  <span className="text-[15px] font-medium text-[#000]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#555]">Shipping</span>
                  <span className="text-[15px] font-medium text-[#000]">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[15px] text-[#555]">Tax (10%)</span>
                  <span className="text-[15px] font-medium text-[#000]">
                    {formatPrice(tax)}
                  </span>
                </div>
                <div className="border-t border-[#ebebeb] pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[18px] font-bold text-[#000]">Total</span>
                    <span className="text-[22px] font-bold text-[#a749ff]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <Link href="/checkout" className="block mb-4">
                <Button size="lg" fullWidth>
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Coupon Code */}
              <div className="mb-4">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-3 border border-[#ebebeb] border-r-0 text-[14px] text-[#333] focus:border-[#a749ff] focus:outline-none transition-colors"
                  />
                  <button className="px-5 py-3 bg-[#a749ff] text-white text-[13px] font-medium uppercase hover:bg-[#000] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && subtotal < 100 && (
                <div className="mt-4 p-4 bg-white border border-[#ebebeb]">
                  <p className="text-[13px] text-[#555]">
                    Add <span className="font-semibold text-[#a749ff]">{formatPrice(100 - subtotal)}</span> more to get free shipping!
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
