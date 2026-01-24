import type { Product, ViewMode } from '@/types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  viewMode?: ViewMode
}

export default function ProductGrid({ products, columns = 4, viewMode = 'grid' }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 text-lg">No products found</p>
      </div>
    )
  }

  // List view
  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} viewMode="list" />
        ))}
      </div>
    )
  }

  // Grid view
  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} viewMode="grid" />
      ))}
    </div>
  )
}
