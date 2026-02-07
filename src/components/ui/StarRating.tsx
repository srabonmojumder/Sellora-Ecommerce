'use client'

import { Star, StarHalf } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  reviews?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
}

export default function StarRating({
  rating,
  reviews,
  size = 'sm',
  showCount = false,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const iconSize = sizes[size]

  return (
    <div className={cn('flex items-center gap-1', className)} role="img" aria-label={`${rating} out of 5 stars${reviews ? `, ${reviews} reviews` : ''}`}>
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(iconSize, 'text-[#ffa900] fill-current')}
          />
        ))}
        {hasHalf && (
          <StarHalf
            key="half"
            className={cn(iconSize, 'text-[#ffa900] fill-current')}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(iconSize, 'text-[#d5d5d5]')}
          />
        ))}
      </div>
      {showCount && reviews !== undefined && (
        <span className="text-[13px] text-[#555] ml-1">({reviews})</span>
      )}
    </div>
  )
}
