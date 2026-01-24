import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider'

    const variants = {
      primary:
        'bg-[#a749ff] text-white hover:bg-[#000]',
      secondary:
        'bg-[#000] text-white hover:bg-[#a749ff]',
      outline:
        'border border-[#ebebeb] text-[#000] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff]',
      ghost:
        'text-[#000] hover:text-[#a749ff] hover:bg-[#f6f6f6]',
      link: 'text-[#a749ff] hover:text-[#000] underline-offset-4 hover:underline',
    }

    const sizes = {
      sm: 'px-6 py-2.5 text-[12px]',
      md: 'px-8 py-3 text-[13px]',
      lg: 'px-10 py-3.5 text-[14px]',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
