'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Repeat } from 'lucide-react'
import type { Product } from '@/types'
import QuickView from '@/components/ui/QuickView'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)
  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0

  const inWishlist = isInWishlist(product.id)
  const inCartAlready = isInCart(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowQuickView(true)
  }

  return (
    <>
      <div
        className="group block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-3d group-hover:shadow-2xl transition-all duration-500 rounded-3xl border-2 border-gray-100 group-hover:border-white overflow-hidden">
          {/* Glow effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

          <Link href={`/products/${product.slug}`} className="block relative">
            {/* Image Container with modern effects */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <Image
                src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Modern Badges with glow */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                {product.badge && (
                  <div className="badge-primary px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-xl animate-slide-right">
                    <span className="font-black text-xs uppercase tracking-wider">{product.badge}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="bg-gradient-to-r from-danger via-secondary-600 to-danger text-white px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-xl font-black text-xs uppercase tracking-wider animate-slide-right animate-pulse-soft"
                       style={{ animationDelay: '0.1s' }}>
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Modern Quick Actions with glassmorphism */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-4 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-500 z-20">
                <button
                  onClick={handleToggleWishlist}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-90 backdrop-blur-xl border-2 ${
                    inWishlist
                      ? 'bg-gradient-to-br from-danger to-secondary-600 text-white border-white/40 scale-105'
                      : 'glass text-gray-700 hover:bg-gradient-to-br hover:from-danger hover:to-secondary-600 hover:text-white hover:border-white/40 border-white/60'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 transition-transform ${inWishlist ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                </button>
                <button
                  onClick={handleQuickView}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-primary-600 hover:to-secondary-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-90 backdrop-blur-xl border-2 border-white/60 hover:border-white/40"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
                <button
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass flex items-center justify-center text-gray-700 hover:bg-gradient-to-br hover:from-accent-600 hover:to-primary-600 hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-90 backdrop-blur-xl border-2 border-white/60 hover:border-white/40"
                  aria-label="Compare"
                >
                  <Repeat className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              </div>

              {/* Modern Add to Cart Button - Desktop with shine effect */}
              <button
                onClick={handleAddToCart}
                className={`hidden sm:flex absolute bottom-0 left-0 right-0 bg-gradient-to-r text-white py-4 px-4 items-center justify-center gap-3 font-bold text-base transition-all duration-500 shadow-2xl btn-modern overflow-hidden ${
                  isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                } ${
                  inCartAlready
                    ? 'from-success via-accent-500 to-success-dark'
                    : 'from-primary-600 via-secondary-600 to-primary-700 hover:from-primary-700 hover:via-secondary-700 hover:to-primary-800'
                }`}
              >
                <ShoppingCart className={`w-5 h-5 ${inCartAlready ? '' : 'group-hover:rotate-12'} transition-transform`} />
                <span>{inCartAlready ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Modern Product Info */}
            <div className="p-5 sm:p-6 relative bg-gradient-to-b from-white to-gray-50/50">
              {/* Category badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl mb-3">
                <span className="text-xs font-black text-primary-600 uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              {/* Product Name with gradient on hover */}
              <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gradient transition-all text-base sm:text-lg leading-tight">
                {product.name}
              </h3>

              {/* Modern Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 transition-all ${
                        i < Math.floor(product.rating)
                          ? 'text-warning fill-current drop-shadow-sm'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-600">
                  {product.rating} <span className="text-gray-400 font-normal">({product.reviews})</span>
                </span>
              </div>

              {/* Modern Price display */}
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-sm font-semibold text-gray-400 line-through decoration-2">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              {/* Modern Add to Cart Button - Mobile */}
              <button
                onClick={handleAddToCart}
                className={`sm:hidden w-full bg-gradient-to-r text-white py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 btn-modern ${
                  inCartAlready
                    ? 'from-success via-accent-500 to-success-dark'
                    : 'from-primary-600 via-secondary-600 to-primary-700 hover:from-primary-700 hover:via-secondary-700 hover:to-primary-800'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{inCartAlready ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              </button>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  )
}
