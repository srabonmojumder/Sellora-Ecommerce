import { cn } from '@/lib/utils'
import type { BadgeVariant } from '@/types'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    new: 'bg-[#22c55e] text-white',
    sale: 'bg-[#ef4444] text-white',
    hot: 'bg-[#f59e0b] text-white',
    default: 'bg-[#a749ff] text-white',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
