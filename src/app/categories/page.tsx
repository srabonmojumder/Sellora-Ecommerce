import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import CategoryCard from '@/components/home/CategoryCard'
import { sampleCategories } from '@/data/products'

export const metadata = {
  title: 'Categories - Sellora',
  description: 'Browse all product categories at Sellora. Find exactly what you\'re looking for.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">All Categories</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Categories</span>
          </nav>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sampleCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
