'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Repeat } from 'lucide-react'
import type { Product, ViewMode } from '@/types'
import QuickView from '@/components/ui/QuickView'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  viewMode?: ViewMode
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
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

  // List view layout
  if (viewMode === 'list') {
    return (
      <>
        <div
          className="group block relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link href={`/products/${product.slug}`} className="block relative">
            <div className="flex gap-6 p-6 bg-white border border-neutral-200 hover:border-neutral-300 transition-all">
              {/* Image */}
              <div className="relative w-48 h-48 flex-shrink-0 bg-neutral-50 overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-neutral-900 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
                    {product.badge}
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-3 right-3 bg-white text-neutral-900 px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-neutral-900">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-neutral-900 fill-current'
                              : 'text-neutral-300 fill-current'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-neutral-600">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-neutral-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-neutral-400 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggleWishlist}
                      className={`p-3 border transition-colors ${
                        inWishlist
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className={`px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-colors ${
                        inCartAlready
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-900 text-white hover:bg-neutral-800'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5 inline-block mr-2" />
                      {inCartAlready ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
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

  // Grid view layout
  return (
    <>
      <div
        className="group block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white border border-neutral-200 group-hover:border-neutral-300 transition-all duration-300 overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block relative">
            {/* Classic Image Container */}
            <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden">
              <Image
                src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Classic Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                {product.badge && (
                  <div className="bg-neutral-900 text-white px-3 py-1 text-[10px] uppercase tracking-widest font-semibold">
                    {product.badge}
                  </div>
                )}
                {discount > 0 && (
                  <div className="bg-white text-neutral-900 px-3 py-1 text-[10px] uppercase tracking-widest font-bold border border-neutral-900">
                    -{discount}%
                  </div>
                )}
              </div>

              {/* Classic Quick Actions */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 sm:group-hover:opacity-100 transition-all duration-300 z-20">
                <button
                  onClick={handleToggleWishlist}
                  className={`w-10 h-10 flex items-center justify-center transition-all duration-200 border ${
                    inWishlist
                      ? 'bg-neutral-900 text-white border-neutral-900'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleQuickView}
                  className="w-10 h-10 bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200"
                  aria-label="Quick view"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  className="w-10 h-10 bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-200"
                  aria-label="Compare"
                >
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              {/* Classic Add to Cart Button - Desktop */}
              <button
                onClick={handleAddToCart}
                className={`hidden sm:flex absolute bottom-0 left-0 right-0 text-white py-4 px-4 items-center justify-center gap-2 font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                  isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                } ${
                  inCartAlready
                    ? 'bg-neutral-700'
                    : 'bg-neutral-900 hover:bg-neutral-800'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{inCartAlready ? 'Added to Cart' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Classic Product Info */}
            <div className="p-4 sm:p-5 relative bg-white">
              {/* Category */}
              <div className="mb-2">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-neutral-900 mb-3 line-clamp-2 text-base leading-snug">
                {product.name}
              </h3>

              {/* Classic Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'text-neutral-900 fill-current'
                          : 'text-neutral-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-neutral-600">
                  ({product.reviews})
                </span>
              </div>

              {/* Classic Price display */}
              <div className="flex items-baseline gap-2 mb-3 sm:mb-0">
                <span className="text-xl font-semibold text-neutral-900">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              {/* Classic Add to Cart Button - Mobile */}
              <button
                onClick={handleAddToCart}
                className={`sm:hidden w-full text-white py-3 px-4 flex items-center justify-center gap-2 font-semibold text-sm uppercase tracking-wide transition-all duration-200 mt-4 ${
                  inCartAlready
                    ? 'bg-neutral-700'
                    : 'bg-neutral-900 hover:bg-neutral-800'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{inCartAlready ? 'Added to Cart' : 'Add to Cart'}</span>
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
