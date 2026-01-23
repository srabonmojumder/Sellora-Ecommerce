'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductGrid from '@/components/products/ProductGrid'
import { useWishlist } from '@/context/WishlistContext'

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Your wishlist is empty
          </h1>
          <p className="text-neutral-600 mb-8">
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
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
                My Wishlist
              </h1>
              <p className="text-neutral-600">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
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
        </div>
      </div>

      {/* Wishlist Products */}
      <div className="container mx-auto px-4 py-12">
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
