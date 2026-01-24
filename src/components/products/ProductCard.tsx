'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Eye, Shuffle } from 'lucide-react'
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
        <div className="group block relative">
          <Link href={`/products/${product.slug}`} className="block relative">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-[#ebebeb] hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div
                className="relative w-full sm:w-[250px] h-[250px] sm:h-[280px] flex-shrink-0 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 250px"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.badge === 'new' && (
                    <span className="bg-[#a749ff] text-white px-3 py-1 text-[11px] font-medium uppercase">
                      New
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-[#a749ff] text-white px-3 py-1 text-[11px] font-medium">
                      -{discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#000] hover:text-[#a749ff] transition-colors mb-2">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[18px] font-medium text-[#000]">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-[16px] text-[#8e8e8e] line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-[#ffa900] fill-current'
                            : 'text-[#d5d5d5] fill-current'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[13px] text-[#555]">({product.reviews} reviews)</span>
                </div>

                <p className="text-[14px] text-[#555] mb-6 line-clamp-2">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleAddToCart}
                    className={`px-6 py-3 text-[13px] font-medium uppercase tracking-wide transition-all duration-300 ${
                      inCartAlready
                        ? 'bg-[#333] text-white'
                        : 'bg-[#a749ff] text-white hover:bg-[#000]'
                    }`}
                  >
                    {inCartAlready ? 'Added' : 'Add To Cart'}
                  </button>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-11 h-11 flex items-center justify-center border transition-all duration-300 ${
                      inWishlist
                        ? 'bg-[#a749ff] text-white border-[#a749ff]'
                        : 'bg-white text-[#000] border-[#ebebeb] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={handleQuickView}
                    className="w-11 h-11 flex items-center justify-center bg-white text-[#000] border border-[#ebebeb] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff] transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <QuickView
          product={product}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      </>
    )
  }

  // Grid view layout - Flone style
  return (
    <>
      <div
        className="group block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-white overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block relative">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f6f6f6]">
              {/* Main Image */}
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered && product.images[1] ? 'opacity-0' : 'opacity-100'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Hover Image */}
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge === 'new' && (
                  <span className="bg-[#a749ff] text-white px-3 py-1 text-[11px] font-medium uppercase">
                    New
                  </span>
                )}
                {product.badge === 'sale' && (
                  <span className="bg-[#a749ff] text-white px-3 py-1 text-[11px] font-medium uppercase">
                    Sale
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-[#a749ff] text-white px-3 py-1 text-[11px] font-medium">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Flone-style Action Icons - Appear from right on hover */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={handleToggleWishlist}
                  className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ${
                    isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  } ${
                    inWishlist
                      ? 'bg-[#a749ff] text-white'
                      : 'bg-white text-[#000] hover:bg-[#a749ff] hover:text-white'
                  }`}
                  style={{ transitionDelay: '0ms' }}
                  title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleQuickView}
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#000] shadow-md hover:bg-[#a749ff] hover:text-white transition-all duration-300 ${
                    isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '50ms' }}
                  title="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#000] shadow-md hover:bg-[#a749ff] hover:text-white transition-all duration-300 ${
                    isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: '100ms' }}
                  title="Compare"
                >
                  <Shuffle className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button - Slides up from bottom on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
                  isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 sm:py-4 text-[13px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                    inCartAlready
                      ? 'bg-[#333] text-white'
                      : 'bg-[#a749ff] text-white hover:bg-[#000]'
                  }`}
                >
                  {inCartAlready ? 'Added to Cart' : 'Add To Cart'}
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="pt-4 pb-2 text-center">
              {/* Product Name */}
              <h3 className="text-[16px] font-medium text-[#000] hover:text-[#a749ff] transition-colors mb-2 line-clamp-1">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-center justify-center gap-3">
                <span className="text-[16px] font-medium text-[#000]">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-[14px] text-[#8e8e8e] line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              {/* Rating - Optional, can be hidden for cleaner look */}
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-[#ffa900] fill-current'
                        : 'text-[#d5d5d5] fill-current'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </Link>

          {/* Mobile Add to Cart - Always visible on mobile */}
          <div className="sm:hidden px-4 pb-4">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 text-[13px] font-medium uppercase tracking-wide transition-colors duration-300 ${
                inCartAlready
                  ? 'bg-[#333] text-white'
                  : 'bg-[#a749ff] text-white hover:bg-[#000]'
              }`}
            >
              {inCartAlready ? 'Added to Cart' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>

      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  )
}
