'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { SIZE_OPTIONS } from '@/lib/constants'

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
  categories?: string[]
}

const ALL_CATEGORIES = [
  'All Categories',
  'Fashion',
  'Men',
  'Women',
  'Electronics',
  'Furniture',
  'Plant',
  'Organic Food',
  'Flower',
  'Book',
  'Cosmetics',
  'Accessories',
  'Handmade',
  'Kids',
  'Auto Parts',
  'Cakes',
  'Pet Food',
  'Medical',
  'Black Friday',
  'Christmas'
]

const COLOR_OPTIONS = [
  { name: 'All Colors', hex: '' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Blue', hex: '#0000FF' }
]

const ALL_SIZES = ['All Sizes', 'X', 'M', 'L', 'XL', 'XXL']

const TAG_OPTIONS = [
  'Fashion', 'Men', 'Jacket', 'Full Sleeve', 'Women', 'Coat',
  'Top', 'Sleeveless', 'Electronics', 'Furniture', 'Plant',
  'Organic Food', 'Flower', 'Book', 'Cosmetics', 'Accessories',
  'Handmade', 'Kids', 'Auto Parts', 'Cakes', 'Pet Food',
  'Medical', 'Black Friday', 'Christmas'
]

export default function ProductFilters({ onFilterChange, categories = [] }: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]
    setSelectedCategories(updated)
    onFilterChange?.({ categories: updated })
  }

  const handleColorToggle = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    setSelectedColors(updated)
  }

  const handleSizeToggle = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    setSelectedSizes(updated)
  }

  const handleTagToggle = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(updated)
  }

  return (
    <div className="space-y-8 bg-white p-6 border border-neutral-200">
      {/* Search */}
      <div>
        <h3 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest pb-3 border-b border-neutral-200">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 focus:outline-none focus:border-neutral-900 text-sm transition-colors"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest pb-3 border-b border-neutral-200">Categories</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {ALL_CATEGORIES.map((category) => (
            <label key={category} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="w-4 h-4 text-neutral-900 border-neutral-400 focus:ring-neutral-900 focus:ring-offset-0"
              />
              <span className="ml-3 text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest pb-3 border-b border-neutral-200">Color</h3>
        <div className="space-y-3">
          {COLOR_OPTIONS.map((color) => (
            <label key={color.name} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedColors.includes(color.name)}
                onChange={() => handleColorToggle(color.name)}
                className="w-4 h-4 text-neutral-900 border-neutral-400 focus:ring-neutral-900 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center gap-2">
                {color.hex && (
                  <div
                    className="w-5 h-5 border border-neutral-300"
                    style={{ backgroundColor: color.hex }}
                  />
                )}
                <span className="text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                  {color.name}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest pb-3 border-b border-neutral-200">Size</h3>
        <div className="space-y-3">
          {ALL_SIZES.map((size) => (
            <label key={size} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeToggle(size)}
                className="w-4 h-4 text-neutral-900 border-neutral-400 focus:ring-neutral-900 focus:ring-offset-0"
              />
              <span className="ml-3 text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors">
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tag */}
      <div>
        <h3 className="text-xs font-bold text-neutral-900 mb-4 uppercase tracking-widest pb-3 border-b border-neutral-200">Tag</h3>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-2 text-xs font-medium uppercase tracking-wide transition-colors border ${
                selectedTags.includes(tag)
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
