'use client'

import { useState, useMemo } from 'react'
import { ChevronDown } from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Select from '@/components/ui/Select'
import { sampleProducts } from '@/data/products'
import { SORT_OPTIONS } from '@/lib/constants'
import type { SortOption } from '@/types'

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories from products
  const categories = Array.from(new Set(sampleProducts.map((p) => p.category)))

  // Sort products based on selection
  const sortedProducts = useMemo(() => {
    const products = [...sampleProducts]

    switch (sortBy) {
      case 'price-low-high':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high-low':
        return products.sort((a, b) => b.price - a.price)
      case 'newest':
        return products.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating)
      case 'popular':
        return products.sort((a, b) => b.reviews - a.reviews)
      default:
        return products
    }
  }, [sortBy])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-3">
            Shop All Products
          </h1>
          <p className="text-neutral-600">
            Showing {sortedProducts.length} products
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters categories={categories} />
          </aside>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-neutral-200 rounded-lg"
            >
              <span className="font-medium">Filters</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {showFilters && (
              <div className="mt-4">
                <ProductFilters categories={categories} />
              </div>
            )}
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white border border-neutral-200 rounded-lg p-4">
              <p className="text-sm text-neutral-600">
                {sortedProducts.length} Products
              </p>
              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-sm font-medium text-neutral-700">
                  Sort by:
                </label>
                <Select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  options={SORT_OPTIONS}
                  className="w-48"
                />
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={sortedProducts} columns={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
