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
  const itemsPerPage = 12

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
    <div className="min-h-screen bg-white">
      {/* Flone-style Breadcrumb */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Shop</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Shop</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-[270px] flex-shrink-0">
            <ProductFilters categories={categories} />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4 pb-6 border-b border-[#ebebeb]">
              {/* Mobile Filters Toggle */}
              <div className="lg:hidden w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#f6f6f6] text-[#000] text-[14px] font-medium hover:bg-[#a749ff] hover:text-white transition-colors"
                >
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-[14px] text-[#555]">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedProducts.length)} of {sortedProducts.length} results
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-[#ebebeb]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#a749ff] text-white' : 'bg-white text-[#555] hover:text-[#a749ff]'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#a749ff] text-white' : 'bg-white text-[#555] hover:text-[#a749ff]'}`}
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
                  className="w-[180px]"
                />
              </div>
            </div>

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden mb-8 bg-[#f6f6f6] p-6">
                <ProductFilters categories={categories} />
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid products={paginatedProducts} columns={3} viewMode={viewMode} />

            {/* Flone-style Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 sm:mt-16">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[14px] font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-[#a749ff] text-white'
                        : 'bg-[#f6f6f6] text-[#555] hover:bg-[#a749ff] hover:text-white'
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
