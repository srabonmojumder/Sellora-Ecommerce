import { SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full px-4 py-3 pr-10 border rounded-lg text-neutral-900 appearance-none',
              'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent',
              'transition-all duration-200 bg-white cursor-pointer',
              error
                ? 'border-accent-rose focus:ring-accent-rose'
                : 'border-neutral-300',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
        </div>
        {error && (
          <p className="mt-2 text-sm text-accent-rose">{error}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
