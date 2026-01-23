'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, ShoppingCart, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft'
          : 'bg-white'
      )}
    >
      {/* Top Bar */}
      <div className="bg-black text-white py-2.5 text-xs">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="hidden sm:block uppercase tracking-wide">Free shipping on orders over $100</p>
            <div className="flex items-center gap-6 ml-auto uppercase tracking-wide">
              <Link href="/track-order" className="hover:text-gray-300 transition-colors">
                Track Order
              </Link>
              <Link href="/contact" className="hover:text-gray-300 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <h1 className="text-3xl font-serif font-bold text-black uppercase tracking-wider">
                Sellora
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-black hover:text-primary font-medium uppercase tracking-wider transition-colors relative group"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-gray-50 transition-colors">
                <Search className="w-5 h-5 text-black" />
              </button>

              <Link
                href="/wishlist"
                className="p-3 hover:bg-gray-50 transition-colors relative"
              >
                <Heart className="w-5 h-5 text-black" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="p-3 hover:bg-gray-50 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-black" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button className="p-3 hover:bg-gray-50 transition-colors hidden md:block">
                <User className="w-5 h-5 text-black" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-3 hover:bg-gray-50 transition-colors lg:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-black" />
                ) : (
                  <Menu className="w-6 h-6 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-black hover:text-primary font-medium uppercase tracking-wider py-3 border-b border-gray-100 transition-colors"
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
