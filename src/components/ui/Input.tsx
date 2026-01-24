import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[14px] font-medium text-[#000] mb-2"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border text-[15px] text-[#000] placeholder:text-[#999] bg-white',
            'focus:outline-none focus:border-[#a749ff]',
            'hover:border-[#999] transition-colors',
            'disabled:bg-[#f6f6f6] disabled:text-[#999] disabled:cursor-not-allowed',
            error
              ? 'border-[#ff4444] focus:border-[#ff4444]'
              : 'border-[#ebebeb]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[13px] text-[#ff4444]">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-[13px] text-[#555]">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
