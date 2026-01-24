'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Currency } from '@/types'
import { DEFAULT_CURRENCY, getCurrencyByCode } from '@/lib/currency'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY)
  const [mounted, setMounted] = useState(false)

  // Load saved currency from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const savedCurrencyCode = localStorage.getItem('sellora-currency')
      if (savedCurrencyCode) {
        const savedCurrency = getCurrencyByCode(savedCurrencyCode)
        setCurrencyState(savedCurrency)
      }
    } catch (error) {
      console.error('Error loading currency from localStorage:', error)
    }
  }, [])

  // Save currency to localStorage when it changes
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    try {
      localStorage.setItem('sellora-currency', newCurrency.code)
    } catch (error) {
      console.error('Error saving currency to localStorage:', error)
    }
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <CurrencyContext.Provider value={{ currency: DEFAULT_CURRENCY, setCurrency }}>
        {children}
      </CurrencyContext.Provider>
    )
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
