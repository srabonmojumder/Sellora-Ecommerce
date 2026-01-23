import Image from 'next/image'
import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-display font-bold mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-white/90">
            {category.productCount} Products
          </p>
        </div>
      </div>
    </Link>
  )
}
