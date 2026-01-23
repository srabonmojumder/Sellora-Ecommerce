import { cn } from '@/lib/utils'
import type { BadgeVariant } from '@/types'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export default function Badge({ variant = 'default', children, className }: BadgeProps) {
  const variants = {
    new: 'bg-accent-green text-white',
    sale: 'bg-accent-red text-white',
    hot: 'bg-accent-yellow text-white',
    default: 'bg-black text-white',
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
