import Link from 'next/link'
import Hero from '@/components/home/Hero'
import ProductGrid from '@/components/products/ProductGrid'
import { ImageBannerGrid, CountdownBanner, FeatureBanner } from '@/components/home/Banner'
import { sampleProducts } from '@/data/products'
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react'

export default function HomePage() {
  const featuredProducts = sampleProducts.slice(0, 8)
  const newArrivals = sampleProducts.filter((p) => p.badge === 'new').slice(0, 4)
  const bestSellers = sampleProducts.slice(0, 4)
  const onSale = sampleProducts.filter((p) => p.badge === 'sale').slice(0, 8)

  const bannerItems = [
    {
      title: 'Women',
      subtitle: 'New Collection',
      link: '/shop?category=women',
      bgColor: '#f1f1f1',
    },
    {
      title: 'Men',
      subtitle: 'New Collection',
      link: '/shop?category=men',
      bgColor: '#f5f5f5',
    },
    {
      title: 'Accessories',
      subtitle: 'New Collection',
      link: '/shop?category=accessories',
      bgColor: '#f8f8f8',
    },
  ]

  const features = [
    {
      icon: <Truck className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Free Shipping',
      description: 'Free shipping on all order',
    },
    {
      icon: <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Support 24/7',
      description: 'Support online 24 hours',
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Money Return',
      description: '30 days money return',
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Order Discount',
      description: 'On every order over $150',
    },
  ]

  return (
    <>
      {/* Hero Slider */}
      <Hero />

      {/* Feature Banner */}
      <FeatureBanner features={features} />

      {/* Category Banners */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ImageBannerGrid items={bannerItems} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header - Flone Style */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-3">
              Featured Products
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#555] max-w-xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
            </p>
          </div>

          {/* Product Tabs - Flone Style */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
            <button className="text-[14px] sm:text-[15px] font-medium text-[#a749ff] border-b-2 border-[#a749ff] pb-1 transition-colors">
              New Arrivals
            </button>
            <button className="text-[14px] sm:text-[15px] font-medium text-[#555] hover:text-[#a749ff] border-b-2 border-transparent hover:border-[#a749ff] pb-1 transition-colors">
              Best Sellers
            </button>
            <button className="text-[14px] sm:text-[15px] font-medium text-[#555] hover:text-[#a749ff] border-b-2 border-transparent hover:border-[#a749ff] pb-1 transition-colors">
              Sale Items
            </button>
          </div>

          <ProductGrid products={featuredProducts} />

          {/* View All Button */}
          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/shop"
              className="inline-block bg-[#a749ff] text-white px-10 sm:px-12 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Big Banner - Sale */}
      <section className="relative bg-[#f1f1f1] overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="text-[13px] sm:text-[14px] text-[#555] uppercase tracking-[3px] mb-3 block">
                Deal Of The Day
              </span>
              <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-[#000] mb-4 leading-tight">
                Big Sale
                <span className="block text-[#a749ff]">50% Off</span>
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#555] mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ullam rem aut amet sequi.
              </p>

              {/* Countdown */}
              <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                {[
                  { value: '24', label: 'Hours' },
                  { value: '59', label: 'Mins' },
                  { value: '59', label: 'Secs' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white flex items-center justify-center mb-1">
                      <span className="text-[22px] sm:text-[26px] font-bold text-[#000]">
                        {item.value}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-[#555] uppercase tracking-wide">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/shop?filter=sale"
                className="inline-block bg-[#a749ff] text-white px-10 sm:px-12 py-3.5 sm:py-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
              >
                Shop Now
              </Link>
            </div>

            {/* Image Placeholder */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]">
                <div className="w-full h-full bg-gradient-to-br from-[#a749ff]/20 to-[#a749ff]/5 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[80px] sm:text-[100px] lg:text-[120px] mb-2">🎉</div>
                    <p className="text-[#555] text-[13px] sm:text-[14px]">Sale Banner Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-3">
              New Arrivals
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#555] max-w-xl mx-auto">
              Check out our latest arrivals for the upcoming season.
            </p>
          </div>

          <ProductGrid products={newArrivals} columns={4} />
        </div>
      </section>

      {/* Two Column Banner */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Banner 1 */}
            <Link
              href="/shop?category=women"
              className="group relative bg-[#f5f5f5] min-h-[250px] sm:min-h-[350px] overflow-hidden flex items-center"
            >
              <div className="relative z-10 p-6 sm:p-10">
                <span className="text-[12px] sm:text-[13px] text-[#555] uppercase tracking-[2px] mb-2 block">
                  New Season
                </span>
                <h3 className="text-[24px] sm:text-[32px] font-bold text-[#000] mb-4 group-hover:text-[#a749ff] transition-colors">
                  Women Collection
                </h3>
                <span className="text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors">
                  Shop Now
                </span>
              </div>
              <div className="absolute right-4 bottom-4 text-[80px] sm:text-[100px] opacity-10 group-hover:opacity-20 transition-opacity">
                👗
              </div>
            </Link>

            {/* Banner 2 */}
            <Link
              href="/shop?category=men"
              className="group relative bg-[#f1f1f1] min-h-[250px] sm:min-h-[350px] overflow-hidden flex items-center"
            >
              <div className="relative z-10 p-6 sm:p-10">
                <span className="text-[12px] sm:text-[13px] text-[#555] uppercase tracking-[2px] mb-2 block">
                  New Season
                </span>
                <h3 className="text-[24px] sm:text-[32px] font-bold text-[#000] mb-4 group-hover:text-[#a749ff] transition-colors">
                  Men Collection
                </h3>
                <span className="text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors">
                  Shop Now
                </span>
              </div>
              <div className="absolute right-4 bottom-4 text-[80px] sm:text-[100px] opacity-10 group-hover:opacity-20 transition-opacity">
                👔
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-3">
              Best Sellers
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#555] max-w-xl mx-auto">
              Our most popular products based on sales.
            </p>
          </div>

          <ProductGrid products={bestSellers} columns={4} />
        </div>
      </section>

      {/* Blog/News Section Preview - Flone Style */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-3">
              Our Blog
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#555] max-w-xl mx-auto">
              Latest news and articles from our blog.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((item) => (
              <article key={item} className="group">
                {/* Image */}
                <Link href={`/blog/post-${item}`} className="block mb-4 sm:mb-5 overflow-hidden">
                  <div className="relative aspect-[16/10] bg-[#f6f6f6] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                      <span className="text-[60px]">📰</span>
                    </div>
                  </div>
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-3 text-[12px] sm:text-[13px] text-[#555]">
                  <span>By Admin</span>
                  <span>•</span>
                  <span>Jan {item + 10}, 2026</span>
                </div>

                {/* Title */}
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#000] group-hover:text-[#a749ff] transition-colors mb-3 line-clamp-2">
                  <Link href={`/blog/post-${item}`}>
                    The Best Fashion Trends for Spring {2026}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[14px] text-[#555] line-clamp-2 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit massa enim.
                </p>

                {/* Read More */}
                <Link
                  href={`/blog/post-${item}`}
                  className="text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] hover:text-[#a749ff] hover:after:bg-[#a749ff] transition-colors inline-block"
                >
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
