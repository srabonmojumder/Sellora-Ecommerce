'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CreditCard, Truck, Lock, ChevronRight, Check } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, tax, shipping, total, clearCart } = useCart()
  const { addToast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1) // 1: Shipping, 2: Payment

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/cart')
    }
  }, [mounted, items.length, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateShipping = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinueToPayment = () => {
    if (validateShipping()) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      addToast('Please fill in all required fields', 'error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      addToast('Order placed successfully! Thank you for your purchase.', 'success')
      router.push('/')
    }, 2000)
  }

  if (!mounted || items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="inline-flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Checkout</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <Link href="/cart" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Cart
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="border-b border-[#ebebeb]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step >= 1 ? 'bg-[#a749ff] text-white' : 'bg-[#f6f6f6] text-[#555]'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-[14px] font-medium hidden sm:block ${step >= 1 ? 'text-[#000]' : 'text-[#555]'}`}>
                Shipping
              </span>
            </div>
            <div className="w-8 sm:w-16 h-[2px] bg-[#ebebeb]">
              <div className={`h-full transition-all duration-300 ${step >= 2 ? 'bg-[#a749ff] w-full' : 'w-0'}`} />
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold ${
                step >= 2 ? 'bg-[#a749ff] text-white' : 'bg-[#f6f6f6] text-[#555]'
              }`}>
                2
              </div>
              <span className={`text-[14px] font-medium hidden sm:block ${step >= 2 ? 'text-[#000]' : 'text-[#555]'}`}>
                Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              {step === 1 && (
                <div className="border border-[#ebebeb] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ebebeb]">
                    <div className="w-10 h-10 bg-[#a749ff] flex items-center justify-center text-white">
                      <Truck className="w-5 h-5" />
                    </div>
                    <h2 className="text-[20px] font-bold text-[#000]">
                      Shipping Information
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <Input
                      label="First Name *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={errors.firstName}
                      placeholder="John"
                    />
                    <Input
                      label="Last Name *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={errors.lastName}
                      placeholder="Doe"
                    />
                    <Input
                      label="Email *"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      placeholder="john@example.com"
                    />
                    <Input
                      label="Phone *"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      error={errors.phone}
                      placeholder="+1 (555) 000-0000"
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Address *"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={errors.address}
                        placeholder="123 Main Street"
                      />
                    </div>
                    <Input
                      label="City *"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      error={errors.city}
                      placeholder="New York"
                    />
                    <Input
                      label="State / Province *"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      error={errors.state}
                      placeholder="NY"
                    />
                    <Input
                      label="ZIP / Postal Code *"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      error={errors.zipCode}
                      placeholder="10001"
                    />
                    <Input
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mt-8">
                    <Button
                      type="button"
                      size="lg"
                      onClick={handleContinueToPayment}
                      className="w-full md:w-auto"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              {step === 2 && (
                <div className="border border-[#ebebeb] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ebebeb]">
                    <div className="w-10 h-10 bg-[#a749ff] flex items-center justify-center text-white">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <h2 className="text-[20px] font-bold text-[#000]">
                      Payment Information
                    </h2>
                  </div>

                  {/* Shipping Summary */}
                  <div className="bg-[#f6f6f6] p-4 mb-6">
                    <p className="text-[13px] text-[#555] mb-1">Shipping to:</p>
                    <p className="text-[14px] text-[#000] font-medium">
                      {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[13px] text-[#a749ff] hover:underline mt-1"
                    >
                      Edit shipping
                    </button>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <Input
                      label="Card Number *"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <Input
                      label="Cardholder Name *"
                      placeholder="John Doe"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <Input label="Expiry Date *" placeholder="MM/YY" required />
                      <Input label="CVV *" placeholder="123" required />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6 p-4 bg-[#f6f6f6]">
                    <Lock className="w-5 h-5 text-[#a749ff]" />
                    <p className="text-[13px] text-[#555]">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" isLoading={isProcessing}>
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f6f6f6] p-6 sm:p-8 sticky top-36">
                <h2 className="text-[20px] font-bold text-[#000] mb-6 pb-4 border-b border-[#ebebeb]">
                  Your Order
                </h2>

                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 bg-white flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium text-[#000] truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[12px] text-[#555]">Qty: {item.quantity}</p>
                        <p className="text-[14px] font-semibold text-[#000]">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6 border-t border-[#ebebeb] pt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-[#555]">Subtotal</span>
                    <span className="text-[15px] font-medium text-[#000]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-[#555]">Shipping</span>
                    <span className="text-[15px] font-medium text-[#000]">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] text-[#555]">Tax</span>
                    <span className="text-[15px] font-medium text-[#000]">
                      {formatPrice(tax)}
                    </span>
                  </div>
                  <div className="border-t border-[#ebebeb] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[18px] font-bold text-[#000]">Total</span>
                      <span className="text-[22px] font-bold text-[#a749ff]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
