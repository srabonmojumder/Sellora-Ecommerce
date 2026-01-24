import { useCurrency } from '@/context/CurrencyContext'
import { formatCurrencyPrice } from '@/lib/currency'

export function useFormatPrice() {
  const { currency } = useCurrency()

  return (priceInUSD: number): string => {
    return formatCurrencyPrice(priceInUSD, currency)
  }
}
