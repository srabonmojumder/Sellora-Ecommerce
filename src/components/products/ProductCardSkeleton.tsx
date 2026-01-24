import Skeleton from '@/components/ui/Skeleton'

export default function ProductCardSkeleton() {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Image Skeleton */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category Badge */}
        <Skeleton className="h-5 w-20" />

        {/* Product Name */}
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}
