'use client'

import Link from 'next/link'
import { Heart, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductGrid from '@/components/products/ProductGrid'
import { useWishlist } from '@/context/WishlistContext'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#f6f6f6]">
          <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Wishlist</h1>
            <nav className="flex items-center justify-center gap-2 text-[14px]">
              <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#555]" />
              <span className="text-[#a749ff]">Wishlist</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <Heart className="w-24 h-24 text-[#d5d5d5] mx-auto mb-6" />
          <h2 className="text-[28px] font-bold text-[#000] mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-[15px] text-[#555] mb-8">
            Save your favorite items to your wishlist and shop them later.
          </p>
          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  const products = items.map((item) => item.product)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">My Wishlist</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Wishlist Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Header with Clear Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-6 border-b border-[#ebebeb] gap-4">
          <p className="text-[15px] text-[#555]">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Are you sure you want to clear your wishlist?')) {
                clearWishlist()
              }
            }}
          >
            Clear Wishlist
          </Button>
        </div>

        {/* Wishlist Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
