'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useCurrency } from '@/context/CurrencyContext'
import { CURRENCIES } from '@/lib/currency'
import { cn } from '@/lib/utils'

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-bold text-white hover:text-white/90 transition-colors rounded-lg"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span>{currency.code}</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fade-in">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center justify-between',
                currency.code === curr.code && 'bg-primary-50 text-primary-600 font-medium'
              )}
            >
              <span>{curr.code}</span>
              <span className="text-gray-500">{curr.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
