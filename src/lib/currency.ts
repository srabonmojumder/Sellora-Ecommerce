import { Currency } from '@/types'

// Available currencies with exchange rates
export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'CAD', symbol: 'C$', rate: 1.35 },
  { code: 'AUD', symbol: 'A$', rate: 1.52 },
  { code: 'JPY', symbol: '¥', rate: 149.50 },
]

export const DEFAULT_CURRENCY: Currency = CURRENCIES[0]

// Get currency by code
export function getCurrencyByCode(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) || DEFAULT_CURRENCY
}

// Convert price from USD to target currency
export function convertPrice(priceInUSD: number, currency: Currency): number {
  return priceInUSD * currency.rate
}

// Format price with currency
export function formatCurrencyPrice(
  priceInUSD: number,
  currency: Currency,
  locale: string = 'en-US'
): string {
  const convertedPrice = convertPrice(priceInUSD, currency)

  // Special formatting for JPY (no decimals)
  if (currency.code === 'JPY') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedPrice)
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedPrice)
}
