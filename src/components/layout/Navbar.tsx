'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, Heart, User, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import CurrencySelector from '@/components/ui/CurrencySelector'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
          isScrolled ? 'shadow-md' : ''
        )}
      >
        {/* Flone-style Top Bar */}
        <div className="bg-[#f6f6f6] border-b border-[#ebebeb]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-[13px]">
              <p className="text-[#555] hidden sm:block">
                Free delivery on order over $100
              </p>
              <p className="text-[#555] sm:hidden text-xs">
                Free shipping $100+
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="text-[#555] hover:text-[#a749ff] transition-colors"
                  >
                    Contact Us
                  </Link>
                  <span className="text-[#ccc]">|</span>
                </div>
                <CurrencySelector />
              </div>
            </div>
          </div>
        </div>

        {/* Flone-style Main Navigation */}
        <nav className="border-b border-[#ebebeb]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-[90px]">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-[28px] sm:text-[32px] font-bold text-[#000] tracking-tight hover:text-[#a749ff] transition-colors">
                  Sellora
                </h1>
              </Link>

              {/* Desktop Navigation - Center */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-8 xl:gap-10">
                  {NAV_LINKS.map((link) => (
                    <div key={link.href} className="relative group">
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 text-[15px] font-medium text-[#000] hover:text-[#a749ff] transition-colors py-2"
                      >
                        {link.label}
                        {(link.submenu || link.megaMenu) && (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Link>
                      {/* Dropdown hover underline effect */}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a749ff] group-hover:w-full transition-all duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-1 sm:gap-3">
                {/* Search */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label="Search"
                >
                  <Search className="w-[22px] h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                </button>

                {/* User Account */}
                <Link
                  href="/account"
                  className="p-2 hover:text-[#a749ff] transition-colors relative group hidden sm:block"
                  aria-label="Account"
                >
                  <User className="w-[22px] h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                </Link>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label="Wishlist"
                >
                  <Heart className="w-[22px] h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#a749ff] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="w-[22px] h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#a749ff] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:text-[#a749ff] transition-colors lg:hidden ml-1"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#000]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#000]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Search Overlay */}
          <div
            className={cn(
              'absolute top-full left-0 right-0 bg-white border-b border-[#ebebeb] transition-all duration-300 overflow-hidden',
              isSearchOpen ? 'max-h-20 py-4' : 'max-h-0 py-0'
            )}
          >
            <div className="container mx-auto px-4">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-[#ebebeb] focus:border-[#a749ff] focus:outline-none text-[15px] transition-colors"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#a749ff] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#ebebeb] shadow-lg transition-all duration-300 overflow-hidden',
              isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
            )}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[15px] font-medium text-[#000] hover:text-[#a749ff] py-3 border-b border-[#ebebeb] last:border-b-0 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[15px] font-medium text-[#000] hover:text-[#a749ff] py-3 sm:hidden transition-colors"
                >
                  My Account
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[130px] sm:h-[140px]" />
    </>
  )
}
