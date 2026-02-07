'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Hero from '@/components/home/Hero'
import ProductGrid from '@/components/products/ProductGrid'
import { ImageBannerGrid, CountdownBanner, FeatureBanner } from '@/components/home/Banner'
import { sampleProducts } from '@/data/products'
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react'

type TabKey = 'newArrivals' | 'bestSellers' | 'saleItems'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  }
}

function padZero(num: number): string {
  return num.toString().padStart(2, '0')
}

export default function HomePage() {
  // -- Product tab state --
  const [activeTab, setActiveTab] = useState<TabKey>('newArrivals')

  // -- Countdown timer state --
  // Target date: 7 days from the initial render, stored once
  const [targetDate] = useState<Date>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    d.setHours(23, 59, 59, 0)
    return d
  })
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeLeft(targetDate))

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // -- Blog dynamic dates --
  const getBlogDate = useCallback((daysAgo: number): string => {
    const d = new Date()
    d.setDate(d.getDate() - daysAgo)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }, [])

  // -- Product filtering by tab --
  const newArrivals = sampleProducts.filter((p) => p.badge === 'new').slice(0, 8)
  const bestSellers = [...sampleProducts]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 8)
  const saleItems = sampleProducts
    .filter((p) => p.badge === 'sale' || p.comparePrice)
    .slice(0, 8)

  const tabProducts: Record<TabKey, typeof sampleProducts> = {
    newArrivals,
    bestSellers,
    saleItems,
  }

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'newArrivals', label: 'New Arrivals' },
    { key: 'bestSellers', label: 'Best Sellers' },
    { key: 'saleItems', label: 'Sale Items' },
  ]

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
      description: 'Free shipping on all orders over $50',
    },
    {
      icon: <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Support 24/7',
      description: 'Dedicated support around the clock',
    },
    {
      icon: <CreditCard className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Money Return',
      description: 'Full refund within 30 days',
    },
    {
      icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />,
      title: 'Member Discount',
      description: 'On every order over $150',
    },
  ]

  // Blog posts with dynamic dates and unique content
  const blogPosts = [
    {
      id: 1,
      daysAgo: 2,
      title: 'Top 10 Wardrobe Essentials You Need This Spring',
      excerpt:
        'Refresh your closet with versatile pieces that transition effortlessly from day to night. From tailored blazers to relaxed linen trousers, these staples will keep you stylish all season.',
    },
    {
      id: 2,
      daysAgo: 5,
      title: 'How to Style Accessories for Every Occasion',
      excerpt:
        'The right accessories can transform any outfit. Discover our expert tips on pairing watches, bags, and jewelry to elevate your everyday look and special event ensembles.',
    },
    {
      id: 3,
      daysAgo: 9,
      title: 'Sustainable Fashion: Making Better Choices',
      excerpt:
        'Learn how conscious shopping decisions can reduce your environmental impact without sacrificing style. We break down what to look for in eco-friendly fabrics and ethical brands.',
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
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-14">
            <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-2 sm:mb-3">
              Featured Products
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#555] max-w-xl mx-auto px-2">
              Discover handpicked selections curated by our stylists. From fresh arrivals to
              top-rated favorites, find exactly what you are looking for.
            </p>
          </div>

          {/* Product Tabs - Functional */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-[14px] sm:text-[15px] font-medium pb-1 transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? 'text-[#a749ff] border-[#a749ff]'
                    : 'text-[#555] border-transparent hover:text-[#a749ff] hover:border-[#a749ff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ProductGrid products={tabProducts[activeTab]} />

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
        <div className="container mx-auto px-4 py-10 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <span className="text-[12px] sm:text-[14px] text-[#555] uppercase tracking-[2px] sm:tracking-[3px] mb-2 sm:mb-3 block">
                Deal Of The Day
              </span>
              <h2 className="text-[28px] sm:text-[48px] lg:text-[56px] font-bold text-[#000] mb-3 sm:mb-4 leading-tight">
                Big Sale
                <span className="block text-[#a749ff]">50% Off</span>
              </h2>
              <p className="text-[13px] sm:text-[15px] text-[#555] mb-5 sm:mb-8 max-w-md mx-auto lg:mx-0">
                Do not miss out on our biggest sale of the season. Premium brands at unbeatable
                prices. Limited stock available — shop now before it is gone.
              </p>

              {/* Live Countdown */}
              <div className="flex justify-center lg:justify-start gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { value: mounted ? padZero(timeLeft.days) : '00', label: 'Days' },
                  { value: mounted ? padZero(timeLeft.hours) : '00', label: 'Hours' },
                  { value: mounted ? padZero(timeLeft.minutes) : '00', label: 'Mins' },
                  { value: mounted ? padZero(timeLeft.seconds) : '00', label: 'Secs' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-[52px] h-[52px] sm:w-16 sm:h-16 bg-white flex items-center justify-center mb-1">
                      <span className="text-[20px] sm:text-[26px] font-bold text-[#000]">
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
                className="inline-block bg-[#a749ff] text-white px-8 sm:px-12 py-3 sm:py-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
              >
                Shop Now
              </Link>
            </div>

            {/* Gradient Visual */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative w-[180px] h-[180px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px]">
                <div className="w-full h-full bg-gradient-to-br from-[#a749ff]/20 to-[#a749ff]/5 rounded-full flex items-center justify-center">
                  <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#a749ff]/30 via-[#d896ff]/20 to-transparent flex items-center justify-center">
                    <div className="w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#a749ff]/40 to-[#e2b0ff]/10" />
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
          <div className="text-center mb-8 sm:mb-12 lg:mb-14">
            <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-2 sm:mb-3">
              New Arrivals
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#555] max-w-xl mx-auto px-2">
              Be the first to explore our latest additions. Fresh styles just landed for the
              upcoming season.
            </p>
          </div>

          <ProductGrid
            products={sampleProducts.filter((p) => p.badge === 'new').slice(0, 4)}
            columns={4}
          />
        </div>
      </section>

      {/* Two Column Banner */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {/* Banner 1 - Women */}
            <Link
              href="/shop?category=women"
              className="group relative bg-[#f5f5f5] min-h-[180px] sm:min-h-[350px] overflow-hidden flex items-center"
            >
              <div className="relative z-10 p-4 sm:p-10">
                <span className="text-[10px] sm:text-[13px] text-[#555] uppercase tracking-[1px] sm:tracking-[2px] mb-1 sm:mb-2 block">
                  New Season
                </span>
                <h3 className="text-[16px] sm:text-[32px] font-bold text-[#000] mb-2 sm:mb-4 group-hover:text-[#a749ff] transition-colors">
                  Women Collection
                </h3>
                <span className="text-[11px] sm:text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors">
                  Shop Now
                </span>
              </div>
              {/* Decorative gradient shape */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#ec4899] via-[#a749ff] to-[#f472b6]" />
              </div>
            </Link>

            {/* Banner 2 - Men */}
            <Link
              href="/shop?category=men"
              className="group relative bg-[#f1f1f1] min-h-[180px] sm:min-h-[350px] overflow-hidden flex items-center"
            >
              <div className="relative z-10 p-4 sm:p-10">
                <span className="text-[10px] sm:text-[13px] text-[#555] uppercase tracking-[1px] sm:tracking-[2px] mb-1 sm:mb-2 block">
                  New Season
                </span>
                <h3 className="text-[16px] sm:text-[32px] font-bold text-[#000] mb-2 sm:mb-4 group-hover:text-[#a749ff] transition-colors">
                  Men Collection
                </h3>
                <span className="text-[11px] sm:text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors">
                  Shop Now
                </span>
              </div>
              {/* Decorative gradient shape */}
              <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#3b82f6] via-[#a749ff] to-[#6366f1]" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-14">
            <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-2 sm:mb-3">
              Best Sellers
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#555] max-w-xl mx-auto px-2">
              Our most popular products loved by thousands of customers. See what everyone is
              adding to their carts.
            </p>
          </div>

          <ProductGrid
            products={[...sampleProducts].sort((a, b) => b.reviews - a.reviews).slice(0, 4)}
            columns={4}
          />
        </div>
      </section>

      {/* Blog/News Section Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 lg:mb-14">
            <h2 className="text-[24px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-2 sm:mb-3">
              Our Blog
            </h2>
            <p className="text-[13px] sm:text-[15px] text-[#555] max-w-xl mx-auto px-2">
              Style guides, trend reports, and tips from our fashion experts to keep you inspired.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                {/* Gradient Thumbnail */}
                <Link href={`/blog/post-${post.id}`} className="block mb-3 sm:mb-5 overflow-hidden">
                  <div className="relative aspect-[16/10] bg-[#f6f6f6] overflow-hidden">
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
                      <div
                        className={`w-full h-full ${
                          post.id === 1
                            ? 'bg-gradient-to-br from-[#a749ff]/20 via-[#d896ff]/10 to-[#f3e8ff]'
                            : post.id === 2
                            ? 'bg-gradient-to-br from-[#ec4899]/20 via-[#f472b6]/10 to-[#fce7f3]'
                            : 'bg-gradient-to-br from-[#3b82f6]/20 via-[#60a5fa]/10 to-[#eff6ff]'
                        }`}
                      />
                      {/* Abstract decorative shapes */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-20 ${
                            post.id === 1
                              ? 'bg-[#a749ff]'
                              : post.id === 2
                              ? 'bg-[#ec4899]'
                              : 'bg-[#3b82f6]'
                          }`}
                        />
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full opacity-15 -ml-6 mt-8 ${
                            post.id === 1
                              ? 'bg-[#d896ff]'
                              : post.id === 2
                              ? 'bg-[#f472b6]'
                              : 'bg-[#60a5fa]'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Meta */}
                <div className="flex items-center gap-4 mb-3 text-[12px] sm:text-[13px] text-[#555]">
                  <span>By Admin</span>
                  <span>&bull;</span>
                  <span>{getBlogDate(post.daysAgo)}</span>
                </div>

                {/* Title */}
                <h3 className="text-[16px] sm:text-[20px] font-semibold text-[#000] group-hover:text-[#a749ff] transition-colors mb-2 sm:mb-3 line-clamp-2">
                  <Link href={`/blog/post-${post.id}`}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] sm:text-[14px] text-[#555] line-clamp-2 mb-3 sm:mb-4">{post.excerpt}</p>

                {/* Read More */}
                <Link
                  href={`/blog/post-${post.id}`}
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
