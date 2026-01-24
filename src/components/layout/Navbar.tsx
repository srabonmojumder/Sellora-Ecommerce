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
        'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
        isScrolled && 'shadow-md'
      )}
    >
      {/* Elegant Top Bar */}
      <div className="bg-neutral-900 text-neutral-100 border-b border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs">
            <p className="hidden sm:block tracking-wide">
              Complimentary shipping on orders over $100
            </p>
            <p className="sm:hidden tracking-wide">Free shipping $100+</p>
            <div className="flex items-center gap-6">
              <Link
                href="/track-order"
                className="hidden sm:block tracking-wide hover:text-white transition-colors uppercase text-[11px] font-medium"
              >
                Track Order
              </Link>
              <Link
                href="/contact"
                className="hidden sm:block tracking-wide hover:text-white transition-colors uppercase text-[11px] font-medium"
              >
                Contact
              </Link>
              <div className="h-3 w-px bg-neutral-700 hidden sm:block" />
              <CurrencySelector />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Classic Logo */}
            <Link href="/" className="group">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
                Sellora
              </h1>
              <div className="h-px bg-neutral-900 w-0 group-hover:w-full transition-all duration-500" />
            </Link>

            {/* Classic Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm tracking-wider uppercase font-medium text-neutral-700 hover:text-neutral-900 transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-neutral-900 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Elegant Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="p-2 hover:bg-neutral-100 transition-colors rounded-sm"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-neutral-700" />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-neutral-100 transition-colors rounded-sm"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 text-neutral-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative p-2 hover:bg-neutral-100 transition-colors rounded-sm"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-semibold">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                className="p-2 hover:bg-neutral-100 transition-colors hidden md:block rounded-sm"
                aria-label="User account"
              >
                <User className="w-5 h-5 text-neutral-700" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-neutral-100 transition-colors lg:hidden ml-2 rounded-sm"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-700" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm tracking-wider uppercase font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 py-3 px-4 transition-colors"
                  >
                    {link.label}
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
