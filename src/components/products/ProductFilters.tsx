'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

interface ProductFiltersProps {
  onFilterChange?: (filters: any) => void
  categories?: string[]
}

const ALL_CATEGORIES = [
  'Fashion',
  'Men',
  'Women',
  'Electronics',
  'Furniture',
  'Accessories',
  'Kids',
  'Cosmetics',
]

const COLOR_OPTIONS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Green', hex: '#008000' },
]

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const TAG_OPTIONS = [
  'Fashion', 'Lifestyle', 'Denim', 'Streetstyle', 'Crafts'
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
    onFilterChange?.({ categories: updated, colors: selectedColors, sizes: selectedSizes, tags: selectedTags })
  }

  const handleColorToggle = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color]
    setSelectedColors(updated)
    onFilterChange?.({ categories: selectedCategories, colors: updated, sizes: selectedSizes, tags: selectedTags })
  }

  const handleSizeToggle = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size]
    setSelectedSizes(updated)
    onFilterChange?.({ categories: selectedCategories, colors: selectedColors, sizes: updated, tags: selectedTags })
  }

  const handleTagToggle = (tag: string) => {
    const updated = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]
    setSelectedTags(updated)
    onFilterChange?.({ categories: selectedCategories, colors: selectedColors, sizes: selectedSizes, tags: updated })
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-[18px] font-semibold text-[#000] mb-5 pb-3 border-b border-[#ebebeb]">
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-12 border border-[#ebebeb] text-[14px] text-[#333] focus:border-[#a749ff] focus:outline-none transition-colors"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-[#a749ff] text-white hover:bg-[#000] transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[18px] font-semibold text-[#000] mb-5 pb-3 border-b border-[#ebebeb]">
          Categories
        </h3>
        <ul className="space-y-1">
          {ALL_CATEGORIES.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryToggle(category)}
                className={`w-full text-left text-[14px] transition-colors flex items-center gap-2 py-1.5 min-h-[36px] ${
                  selectedCategories.includes(category)
                    ? 'text-[#a749ff] font-medium'
                    : 'text-[#555] hover:text-[#a749ff]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-colors flex-shrink-0 ${
                  selectedCategories.includes(category) ? 'bg-[#a749ff]' : 'bg-transparent'
                }`} />
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Color */}
      <div>
        <h3 className="text-[18px] font-semibold text-[#000] mb-5 pb-3 border-b border-[#ebebeb]">
          Color
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`w-9 h-9 sm:w-8 sm:h-8 border-2 rounded transition-all ${
                selectedColors.includes(color.name)
                  ? 'border-[#a749ff] scale-110'
                  : 'border-[#ebebeb] hover:border-[#a749ff]'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-[18px] font-semibold text-[#000] mb-5 pb-3 border-b border-[#ebebeb]">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`min-w-[42px] h-10 px-3 text-[13px] font-medium border transition-all ${
                selectedSizes.includes(size)
                  ? 'bg-[#a749ff] text-white border-[#a749ff]'
                  : 'bg-white text-[#555] border-[#ebebeb] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff]'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-[18px] font-semibold text-[#000] mb-5 pb-3 border-b border-[#ebebeb]">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-4 py-2.5 text-[13px] capitalize transition-all min-h-[36px] ${
                selectedTags.includes(tag)
                  ? 'bg-[#a749ff] text-white'
                  : 'bg-[#f6f6f6] text-[#555] hover:bg-[#a749ff] hover:text-white'
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
