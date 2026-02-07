'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#a749ff] text-white flex items-center justify-center shadow-lg hover:bg-[#000] transition-all duration-300 ${
        isVisible
          ? 'opacity-100 visible translate-y-0'
          : 'opacity-0 invisible translate-y-4'
      }`}
      aria-label="Back to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  )
}
