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
            className="block text-[14px] font-medium text-[#000] mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full px-4 py-3 pr-10 border text-[14px] text-[#333] appearance-none bg-white cursor-pointer',
              'focus:outline-none focus:border-[#a749ff] transition-colors duration-300',
              'disabled:bg-[#f6f6f6] disabled:text-[#999] disabled:cursor-not-allowed',
              error
                ? 'border-[#ff5252] focus:border-[#ff5252]'
                : 'border-[#ebebeb]',
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
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555] pointer-events-none" />
        </div>
        {error && (
          <p className="mt-2 text-[13px] text-[#ff5252]">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
