'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronDown, Grid, List, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Select from '@/components/ui/Select'
import { sampleProducts } from '@/data/products'
import { SORT_OPTIONS } from '@/lib/constants'
import type { SortOption, ViewMode } from '@/types'

export default function ShopPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[]
    colors: string[]
    sizes: string[]
    tags: string[]
  }>({
    categories: [],
    colors: [],
    sizes: [],
    tags: [],
  })
  const itemsPerPage = 12

  const categories = Array.from(new Set(sampleProducts.map((p) => p.category)))

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (activeFilters.categories.length > 0) {
      products = products.filter((p) =>
        activeFilters.categories.includes(p.category)
      )
    }

    // Color filter
    if (activeFilters.colors.length > 0) {
      products = products.filter((p) =>
        p.colors?.some((c) => activeFilters.colors.includes(c.name))
      )
    }

    // Size filter
    if (activeFilters.sizes.length > 0) {
      products = products.filter((p) =>
        p.sizes?.some((s) => activeFilters.sizes.includes(s))
      )
    }

    // Tag filter
    if (activeFilters.tags.length > 0) {
      products = products.filter((p) =>
        p.tags.some((t) => activeFilters.tags.includes(t))
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low-high':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high-low':
        return products.sort((a, b) => b.price - a.price)
      case 'newest':
        return products.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      case 'rating':
        return products.sort((a, b) => b.rating - a.rating)
      case 'popular':
        return products.sort((a, b) => b.reviews - a.reviews)
      default:
        return products
    }
  }, [sortBy, searchQuery, activeFilters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const handleFilterChange = (filters: {
    categories: string[]
    colors: string[]
    sizes: string[]
    tags: string[]
  }) => {
    setActiveFilters(filters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">
            {searchQuery ? `Results for "${searchQuery}"` : 'Shop'}
          </h1>
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
          {/* Filters Sidebar */}
          <aside className="hidden lg:block w-[270px] flex-shrink-0">
            <ProductFilters categories={categories} onFilterChange={handleFilterChange} />
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4 pb-6 border-b border-[#ebebeb]">
              <div className="lg:hidden w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#f6f6f6] text-[#000] text-[14px] font-medium hover:bg-[#a749ff] hover:text-white transition-colors"
                >
                  <span>Filters</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-[14px] text-[#555]">
                  {filteredProducts.length === 0
                    ? 'No products found'
                    : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} results`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#ebebeb]">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-[#a749ff] text-white'
                        : 'bg-white text-[#555] hover:text-[#a749ff]'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-[#a749ff] text-white'
                        : 'bg-white text-[#555] hover:text-[#a749ff]'
                    }`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

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
                <ProductFilters categories={categories} onFilterChange={handleFilterChange} />
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[18px] font-medium text-[#000] mb-2">No products found</p>
                <p className="text-[14px] text-[#555] mb-6">
                  Try adjusting your search or filter to find what you&apos;re looking for.
                </p>
                <Link
                  href="/shop"
                  className="inline-block bg-[#a749ff] text-white px-8 py-3 text-[13px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
                >
                  Clear Filters
                </Link>
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} columns={3} viewMode={viewMode} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12 sm:mt-16">
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
