'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    subtitle: 'New Arrivals',
    title: 'Big Sale',
    highlight: '30% Off',
    description: 'Discover the latest trends with unbeatable deals. Premium fashion at prices you will love.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: '/images/hero/slider-1.jpg',
    bgColor: '#f1f1f1',
  },
  {
    id: 2,
    subtitle: 'Spring Collection',
    title: 'New Season',
    highlight: 'Sale 50%',
    description: 'Refresh your wardrobe with our curated spring collection. Style meets comfort.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: '/images/hero/slider-2.jpg',
    bgColor: '#f5f5f5',
  },
  {
    id: 3,
    subtitle: 'Summer Collection',
    title: 'Hot Deals',
    highlight: 'Up to 70%',
    description: 'Get ready for summer with exclusive deals on trending styles and must-have pieces.',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    image: '/images/hero/slider-3.jpg',
    bgColor: '#f8f8f8',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <section className="relative w-full overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundColor: slide.bgColor }}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30 sm:bg-black/20" />
            </div>

            <div className="container mx-auto px-4 h-full relative z-10">
              <div className="flex items-center h-full">
                {/* Text Content - Full width on mobile, centered */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left py-6 sm:py-8">
                  <span
                    className={`text-[12px] sm:text-[14px] md:text-[16px] text-white/90 uppercase tracking-[2px] sm:tracking-[3px] mb-2 sm:mb-3 transition-all duration-500 delay-100 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.subtitle}
                  </span>

                  <h1
                    className={`text-[28px] sm:text-[40px] md:text-[52px] lg:text-[64px] font-bold text-white leading-tight mb-1 sm:mb-3 transition-all duration-500 delay-200 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <span
                    className={`text-[22px] sm:text-[30px] md:text-[40px] font-bold text-[#a749ff] mb-3 sm:mb-4 drop-shadow-lg transition-all duration-500 delay-300 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.highlight}
                  </span>

                  <p
                    className={`text-[13px] sm:text-[15px] text-white/80 mb-5 sm:mb-7 max-w-sm mx-auto lg:mx-0 leading-relaxed hidden sm:block transition-all duration-500 delay-400 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.description}
                  </p>

                  <div
                    className={`transition-all duration-500 delay-500 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    <Link
                      href={slide.buttonLink}
                      className="inline-block bg-[#a749ff] text-white px-7 sm:px-10 py-2.5 sm:py-3.5 text-[13px] sm:text-[15px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-[#a749ff] text-[#333] hover:text-white flex items-center justify-center transition-all duration-300 rounded-full"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-[#a749ff] text-[#333] hover:text-white flex items-center justify-center transition-all duration-300 rounded-full"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#a749ff] w-7 sm:w-8'
                : 'bg-white/70 w-2.5 sm:w-3 hover:bg-[#a749ff]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
