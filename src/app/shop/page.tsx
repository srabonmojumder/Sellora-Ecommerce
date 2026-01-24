'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, Grid, List, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Select from '@/components/ui/Select'
import { sampleProducts } from '@/data/products'
import { SORT_OPTIONS } from '@/lib/constants'
import type { SortOption, ViewMode } from '@/types'

export default function ShopPage() {
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

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

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-xs">
            <Link href="/" className="text-neutral-600 hover:text-neutral-900 transition-colors tracking-wider uppercase font-medium">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400" />
            <span className="text-neutral-900 tracking-wider uppercase font-semibold">Shop</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-10">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters categories={categories} />
          </aside>

          {/* Mobile Filters Toggle */}
          <div className="lg:hidden mb-6 w-full">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-5 py-3 bg-white border border-neutral-300 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-neutral-50"
            >
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {showFilters && (
              <div className="mt-4 bg-white border border-neutral-300 p-4">
                <ProductFilters categories={categories} />
              </div>
            )}
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-4">
                <p className="text-xs text-neutral-600 tracking-wide uppercase">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-neutral-300">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-600 hover:bg-neutral-100'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
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
            <ProductGrid products={paginatedProducts} columns={3} viewMode={viewMode} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-neutral-200">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-semibold transition-colors ${
                      currentPage === page
                        ? 'bg-neutral-900 text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
