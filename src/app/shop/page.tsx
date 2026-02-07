'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Grid, List, ChevronRight, SlidersHorizontal, X } from 'lucide-react'
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

  const totalActiveFilters =
    activeFilters.categories.length +
    activeFilters.colors.length +
    activeFilters.sizes.length +
    activeFilters.tags.length

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
      {/* Hero Banner */}
      <div className="relative bg-[#f6f6f6] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt="Shop banner"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 py-12 sm:py-20 text-center">
          <span className="text-[12px] sm:text-[13px] text-[#a749ff] uppercase tracking-[3px] mb-3 block font-medium">
            Explore Our Collection
          </span>
          <h1 className="text-[28px] sm:text-[44px] font-bold text-[#000] mb-3 sm:mb-4">
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
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0">
            <div className="sticky top-[130px]">
              <ProductFilters categories={categories} onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-[#ebebeb]">
              <div className="flex items-center justify-between w-full  gap-3">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border border-[#ebebeb] text-[#000] text-[13px] sm:text-[14px] font-medium hover:border-[#a749ff] hover:text-[#a749ff] transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Filters</span>
                    {totalActiveFilters > 0 && (
                      <span className="w-5 h-5 bg-[#a749ff] text-white text-[11px] font-bold flex items-center justify-center rounded-full">
                        {totalActiveFilters}
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-[13px] sm:text-[14px] text-[#555]">
                  {filteredProducts.length === 0
                    ? 'No products found'
                    : `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} results`}
                </p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="hidden sm:flex items-center border border-[#ebebeb]">
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
                    className="w-[140px] sm:w-[180px]"
                  />
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {totalActiveFilters > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-[13px] text-[#555] mr-1">Active:</span>
                {activeFilters.categories.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f6f6f6] text-[12px] text-[#333] font-medium">
                    {c}
                  </span>
                ))}
                {activeFilters.colors.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f6f6f6] text-[12px] text-[#333] font-medium">
                    {c}
                  </span>
                ))}
                {activeFilters.sizes.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f6f6f6] text-[12px] text-[#333] font-medium">
                    Size: {s}
                  </span>
                ))}
                {activeFilters.tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#f6f6f6] text-[12px] text-[#333] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Mobile Filters Panel */}
            {showFilters && (
              <div className="lg:hidden mb-6 sm:mb-8">
                <div className="bg-[#f6f6f6] p-4 sm:p-6 relative">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="absolute top-3 right-3 p-1 hover:text-[#a749ff] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <ProductFilters categories={categories} onFilterChange={handleFilterChange} />
                </div>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 bg-[#f6f6f6] rounded-full flex items-center justify-center">
                  <SlidersHorizontal className="w-8 h-8 text-[#999]" />
                </div>
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
              <div className="flex items-center justify-center gap-2 mt-10 sm:mt-14">
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[14px] font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-[#f6f6f6] text-[#ccc] cursor-not-allowed'
                      : 'bg-[#f6f6f6] text-[#555] hover:bg-[#a749ff] hover:text-white'
                  }`}
                >
                  &lsaquo;
                </button>
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
                <button
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[14px] font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-[#f6f6f6] text-[#ccc] cursor-not-allowed'
                      : 'bg-[#f6f6f6] text-[#555] hover:bg-[#a749ff] hover:text-white'
                  }`}
                >
                  &rsaquo;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
