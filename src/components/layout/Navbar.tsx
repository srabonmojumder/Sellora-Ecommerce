'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import CurrencySelector from '@/components/ui/CurrencySelector'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass shadow-xl'
          : 'bg-white/60 backdrop-blur-md'
      )}
    >
      {/* Top Bar with modern gradient */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 text-white py-2.5 text-xs sm:text-sm"
           style={{ backgroundSize: '200% 100%' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <p className="hidden sm:block font-bold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse-soft" />
              Free shipping on orders over $100
            </p>
            <p className="sm:hidden font-bold">
              Free shipping $100+
            </p>
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <Link href="/track-order" className="hidden sm:block font-bold hover:text-white/80 transition-colors hover:scale-105 transform">
                Track Order
              </Link>
              <Link href="/contact" className="hidden sm:block font-bold hover:text-white/80 transition-colors hover:scale-105 transform">
                Contact
              </Link>
              <div className="h-4 w-px bg-white/30 hidden sm:block" />
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-1 hover:bg-white/20 transition-colors">
                <CurrencySelector />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar with glassmorphism */}
      <nav className={cn(
        'border-b transition-all duration-300',
        isScrolled ? 'border-white/20' : 'border-gray-200/50'
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo with modern effect */}
            <Link href="/" className="flex items-center group relative">
              <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text group-hover:scale-105 transition-all duration-300"
                  style={{ backgroundSize: '200% auto' }}>
                Sellora
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            </Link>

            {/* Desktop Navigation with modern hover effects */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              {NAV_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-bold text-gray-700 hover:text-primary-600 transition-all duration-300 group rounded-xl overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Modern Icons with glassmorphism */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="relative p-2.5 sm:p-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 rounded-xl transition-all duration-300 group overflow-hidden"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700 group-hover:text-primary-600 transition-all group-hover:scale-110 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2.5 sm:p-3 hover:bg-gradient-to-r hover:from-secondary-50 hover:to-danger/10 rounded-xl transition-all duration-300 group overflow-hidden"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-danger transition-all group-hover:scale-110 group-hover:fill-danger/20 relative z-10" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gradient-to-r from-danger via-secondary-600 to-danger-dark text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 font-black animate-scale-in shadow-lg z-20">
                    {wishlistCount}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-400/10 to-danger/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link
                href="/cart"
                className="relative p-2.5 sm:p-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 rounded-xl transition-all duration-300 group overflow-hidden"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-primary-600 transition-all group-hover:scale-110 relative z-10" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center rounded-full px-1 font-black animate-scale-in shadow-lg z-20 animate-pulse-soft">
                    {itemCount}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-accent-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <button
                className="relative p-2.5 sm:p-3 hover:bg-gradient-to-r hover:from-accent-50 hover:to-primary-50 rounded-xl transition-all duration-300 hidden md:block group overflow-hidden"
                aria-label="User account"
              >
                <User className="w-5 h-5 text-gray-700 group-hover:text-accent-600 transition-all group-hover:scale-110 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-400/10 to-primary-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Mobile Menu Toggle with modern effect */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2.5 sm:p-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 rounded-xl transition-all duration-300 lg:hidden ml-1 group overflow-hidden"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 group-hover:text-danger transition-all group-hover:rotate-90 relative z-10" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-all group-hover:scale-110 relative z-10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>

        {/* Modern Mobile Menu with glassmorphism */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 glass-dark text-white animate-slide-down">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-base font-bold text-white/90 hover:text-white py-4 px-6 rounded-2xl transition-all overflow-hidden group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-primary-400 via-secondary-400 to-accent-400 group-hover:h-3/4 transition-all duration-300 rounded-r-full" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
