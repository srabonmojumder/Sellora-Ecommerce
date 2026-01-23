import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-neutral-900 mb-6 animate-fade-in">
            Discover Premium Quality
            <span className="block text-primary-500 mt-2">That Elevates Your Style</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto animate-slide-up">
            Explore our curated collection of premium products designed to enhance your lifestyle. Quality craftsmanship meets modern design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link href="/shop">
              <Button size="lg" className="w-full sm:w-auto">
                Shop Now
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                10K+
              </div>
              <div className="text-sm text-neutral-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                50K+
              </div>
              <div className="text-sm text-neutral-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1">
                100+
              </div>
              <div className="text-sm text-neutral-600">Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent-rose/10 rounded-full blur-3xl" />
    </section>
  )
}
