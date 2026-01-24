import Link from 'next/link'
import { ArrowRight, Shield, Truck, CreditCard } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gray-50" />

      <div className="container mx-auto px-4 py-20 sm:py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-50 text-secondary-700 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-secondary-600 rounded-full" />
              New Collection 2026
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-900 leading-tight">
              Premium Quality
              <span className="block text-secondary-600">Products</span>
              <span className="block">For Your Lifestyle</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
              Discover our curated collection of premium products. Quality craftsmanship, modern design, and unbeatable prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto group">
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Browse Categories
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-gray-700">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-secondary-600" />
                <span className="text-sm font-medium text-gray-700">Easy Returns</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative animate-slide-up">
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden shadow-2xl">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <div className="text-6xl">🛍️</div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Image Here</h3>
                    <p className="text-gray-600">Hero product showcase</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-xl p-4 max-w-[180px] hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.9</p>
                    <p className="text-xs text-gray-600">Customer Rating</p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 max-w-[180px] hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">50K+</p>
                    <p className="text-xs text-gray-600">Orders Delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
