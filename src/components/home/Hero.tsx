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
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ullam rem aut amet sequi.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ullam rem aut amet sequi.',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas ullam rem aut amet sequi.',
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
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundColor: slide.bgColor }}
          >
            <div className="container mx-auto px-4 h-full">
              <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
                {/* Text Content */}
                <div className="flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left py-8 lg:py-0">
                  <span
                    className={`text-[14px] sm:text-[16px] text-[#555] uppercase tracking-[3px] mb-2 sm:mb-4 transition-all duration-500 delay-100 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.subtitle}
                  </span>

                  <h1
                    className={`text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold text-[#000] leading-tight mb-2 sm:mb-4 transition-all duration-500 delay-200 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <span
                    className={`text-[28px] sm:text-[36px] md:text-[48px] font-bold text-[#a749ff] mb-4 sm:mb-6 transition-all duration-500 delay-300 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.highlight}
                  </span>

                  <p
                    className={`text-[14px] sm:text-[16px] text-[#555] mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 transition-all duration-500 delay-400 ${
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
                      className="inline-block bg-[#a749ff] text-white px-8 sm:px-10 py-3 sm:py-4 text-[14px] sm:text-[16px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-[200px] sm:h-[300px] lg:h-full order-1 lg:order-2 flex items-center justify-center">
                  <div
                    className={`relative w-full h-full transition-all duration-500 ${
                      index === currentSlide
                        ? 'scale-100 opacity-100'
                        : 'scale-95 opacity-0'
                    }`}
                  >
                    {/* Placeholder for hero image - using gradient background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
                        <div className="w-full h-full bg-gradient-to-br from-[#a749ff]/20 to-[#a749ff]/5 rounded-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-[60px] sm:text-[80px] md:text-[100px] mb-2 sm:mb-4">🛍️</div>
                            <p className="text-[#555] text-[12px] sm:text-[14px]">Hero Image {index + 1}</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-[#a749ff] text-[#333] hover:text-white flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-[#a749ff] text-[#333] hover:text-white flex items-center justify-center transition-all duration-300 group"
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
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#a749ff] w-6 sm:w-8'
                : 'bg-[#ccc] hover:bg-[#a749ff]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
