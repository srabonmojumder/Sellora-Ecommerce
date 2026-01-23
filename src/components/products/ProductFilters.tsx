'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { PRICE_RANGES, SIZE_OPTIONS } from '@/lib/constants'

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
  categories?: string[]
}

export default function ProductFilters({ onFilterChange, categories = [] }: ProductFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(updated)
    onFilterChange?.({ categories: updated })
  }

  const handleSizeToggle = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    setSelectedSizes(updated)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSelectedPriceRange(null)
    setSelectedSizes([])
    setInStock(false)
    setOnSale(false)
    onFilterChange?.({})
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedPriceRange !== null ||
    selectedSizes.length > 0 ||
    inStock ||
    onSale

  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-neutral-900 mb-3">Categories</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
                />
                <span className="ml-3 text-neutral-700 group-hover:text-neutral-900">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <label key={index} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="price-range"
                checked={selectedPriceRange === index}
                onChange={() => setSelectedPriceRange(index)}
                className="w-4 h-4 text-neutral-900 border-neutral-300 focus:ring-neutral-900"
              />
              <span className="ml-3 text-neutral-700 group-hover:text-neutral-900">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium text-neutral-900 mb-3">Availability</h4>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
          />
          <span className="ml-3 text-neutral-700 group-hover:text-neutral-900">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Special Offers */}
      <div>
        <h4 className="font-medium text-neutral-900 mb-3">Special Offers</h4>
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
            className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
          />
          <span className="ml-3 text-neutral-700 group-hover:text-neutral-900">
            On Sale
          </span>
        </label>
      </div>
    </div>
  )
}
