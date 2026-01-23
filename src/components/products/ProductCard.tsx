'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Eye, Repeat } from 'lucide-react'
import type { Product } from '@/types'
import Badge from '@/components/ui/Badge'
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
        <Link href={`/products/${product.slug}`} className="block">
          <div className="bg-white border border-gray-200 hover:border-black transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
              <Image
                src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && <Badge variant={product.badge}>{product.badge}</Badge>}
                {discount > 0 && (
                  <Badge variant="sale">-{discount}%</Badge>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={handleToggleWishlist}
                  className={`w-10 h-10 flex items-center justify-center transition-all ${
                    inWishlist
                      ? 'bg-black text-white'
                      : 'bg-white text-black hover:bg-black hover:text-white border border-gray-200'
                  }`}
                  aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleQuickView}
                  className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  aria-label="Quick view"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  aria-label="Compare"
                >
                  <Repeat className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`absolute bottom-0 left-0 right-0 bg-black text-white py-3 flex items-center justify-center gap-2 font-medium uppercase tracking-wide text-sm transition-transform duration-300 hover:bg-primary ${
                  isHovered ? 'translate-y-0' : 'translate-y-full'
                } ${inCartAlready ? 'bg-primary' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {inCartAlready ? 'In Cart' : 'Add to Cart'}
              </button>
            </div>

          {/* Product Info */}
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{product.category}</p>
            <h3 className="font-serif font-normal text-black mb-3 line-clamp-2 hover:text-primary transition-colors text-lg">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent-gold fill-current'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-black">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
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
