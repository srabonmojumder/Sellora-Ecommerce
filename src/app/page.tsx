import Link from 'next/link'
import Hero from '@/components/home/Hero'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryCard from '@/components/home/CategoryCard'
import Button from '@/components/ui/Button'
import { sampleProducts, sampleCategories } from '@/data/products'

export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, 8)
  const newArrivals = sampleProducts.filter((p) => p.badge === 'new').slice(0, 4)
  const onSale = sampleProducts.filter((p) => p.badge === 'sale').slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Featured Categories with modern design */}
      <section className="section-padding-sm bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary-400/10 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-6 shadow-lg hover:scale-105 transition-transform">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse-soft" />
              <span className="text-sm font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Categories
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6">
              Shop by{' '}
              <span className="text-gradient">Category</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl font-medium">
              Explore our wide range of categories and find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {sampleCategories.slice(0, 6).map((category, index) => (
              <div
                key={category.id}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding-sm bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-12 lg:mb-16 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 rounded-full mb-4">
                <span className="text-sm font-semibold text-primary-600">Featured</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                Featured Products
              </h2>
              <p className="text-gray-600 text-base sm:text-lg">
                Handpicked products just for you
              </p>
            </div>
            <Link href="/shop" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">View All</Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding-sm bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-success-light rounded-full mb-4">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft"></span>
              <span className="text-sm font-semibold text-success-dark">New Arrivals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Just In
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Check out our latest additions
            </p>
          </div>
          <ProductGrid products={newArrivals} columns={4} />
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <Link href="/shop?filter=new">
              <Button size="lg">Explore More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Ultra-Modern Special Offers Banner */}
      <section className="relative overflow-hidden section-padding-sm bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 text-white">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/50 via-secondary-500/50 to-accent-500/50 animate-gradient"
             style={{ backgroundSize: '400% 400%' }} />

        {/* Floating orbs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl animate-float"
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-500/30 rounded-full blur-3xl animate-morph" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 glass-dark rounded-full mb-8 shadow-2xl hover:scale-105 transition-transform border-2 border-white/20">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="text-base font-black uppercase tracking-wider">Limited Time Offer</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 leading-tight drop-shadow-2xl">
              Special Offer
              <span className="block text-white/90 mt-2">Up to 50% Off</span>
            </h2>

            <p className="text-xl sm:text-2xl md:text-3xl mb-10 sm:mb-12 text-white/90 max-w-3xl mx-auto font-bold leading-relaxed drop-shadow-lg">
              Get exclusive discounts on selected items. Limited time only!
            </p>

            <Link href="/shop?filter=sale" className="inline-block group">
              <Button
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-50 shadow-2xl hover:shadow-white/50 px-12 py-5 text-xl font-black hover:scale-110 border-4 border-white/20"
              >
                <span className="mr-3">Shop Sale Now</span>
                <span className="group-hover:translate-x-2 inline-block transition-transform">→</span>
              </Button>
            </Link>

            {/* Countdown timer effect (decorative) */}
            <div className="mt-12 flex justify-center gap-4 sm:gap-6">
              {['24', '15', '30'].map((num, i) => (
                <div key={i} className="glass-dark px-6 py-4 rounded-2xl border-2 border-white/20 hover:scale-110 transition-transform">
                  <div className="text-3xl sm:text-4xl font-black mb-1">{num}</div>
                  <div className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-wider">
                    {i === 0 ? 'Hours' : i === 1 ? 'Mins' : 'Secs'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="section-padding-sm bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-danger-light rounded-full mb-4">
              <span className="text-sm font-semibold text-danger-dark">Sale</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              On Sale Now
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              Don&apos;t miss out on these amazing deals
            </p>
          </div>
          <ProductGrid products={onSale} columns={4} />
        </div>
      </section>

      {/* Ultra-Modern Features */}
      <section className="section-padding-sm bg-gradient-to-b from-white via-gray-50 to-white border-t border-gray-200/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="group text-center p-8 sm:p-10 card-glass hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 group-hover:text-gradient transition-all">
                Free Shipping
              </h3>
              <p className="text-gray-600 text-base sm:text-lg font-semibold">
                On orders over $100
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 sm:p-10 card-glass hover:scale-105 transition-all duration-500 cursor-pointer">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-success to-accent-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-success to-accent-400 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 group-hover:text-gradient transition-all">
                Money Back Guarantee
              </h3>
              <p className="text-gray-600 text-base sm:text-lg font-semibold">
                30-day return policy
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 sm:p-10 card-glass hover:scale-105 transition-all duration-500 cursor-pointer sm:col-span-2 lg:col-span-1">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-secondary-600 to-accent-600 rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:rotate-6 group-hover:scale-110">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-0 group-hover:opacity-30 blur-2xl transition-opacity" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 group-hover:text-gradient transition-all">
                24/7 Support
              </h3>
              <p className="text-gray-600 text-base sm:text-lg font-semibold">
                Dedicated customer service
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
