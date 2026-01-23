import CategoryCard from '@/components/home/CategoryCard'
import { sampleCategories } from '@/data/products'

export const metadata = {
  title: 'Categories - Sellora',
  description: 'Browse all product categories at Sellora. Find exactly what you\'re looking for.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-3">
            All Categories
          </h1>
          <p className="text-lg text-neutral-600">
            Explore our wide range of product categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
