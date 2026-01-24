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
        className="flex items-center gap-1 text-[13px] text-[#555] hover:text-[#a749ff] transition-colors"
        aria-label="Select currency"
        aria-expanded={isOpen}
      >
        <span>{currency.code}</span>
        <ChevronDown
          className={cn(
            'w-3 h-3 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-28 bg-white shadow-lg border border-[#ebebeb] py-1 z-50">
          {CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                setCurrency(curr)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-4 py-2 text-left text-[13px] hover:bg-[#f6f6f6] hover:text-[#a749ff] transition-colors flex items-center justify-between',
                currency.code === curr.code && 'bg-[#f6f6f6] text-[#a749ff] font-medium'
              )}
            >
              <span>{curr.code}</span>
              <span className="text-[#999]">{curr.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
