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

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCategories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
                Featured Products
              </h2>
              <p className="text-neutral-600">
                Handpicked products just for you
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
              New Arrivals
            </h2>
            <p className="text-neutral-600">
              Check out our latest additions
            </p>
          </div>
          <ProductGrid products={newArrivals} columns={4} />
          <div className="text-center mt-8">
            <Link href="/shop?filter=new">
              <Button>Explore More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Special Offer
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Get up to 50% off on selected items. Limited time only!
            </p>
            <Link href="/shop?filter=sale">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-500">
                Shop Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sale Products */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-3">
              On Sale Now
            </h2>
            <p className="text-neutral-600">
              Don't miss out on these amazing deals
            </p>
          </div>
          <ProductGrid products={onSale} columns={4} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Free Shipping
              </h3>
              <p className="text-neutral-600">
                On orders over $100
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Money Back Guarantee
              </h3>
              <p className="text-neutral-600">
                30-day return policy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-neutral-600">
                Dedicated customer service
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
