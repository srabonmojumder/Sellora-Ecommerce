'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, Search, ShoppingCart, Heart, User, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import CurrencySelector from '@/components/ui/CurrencySelector'
import CartDrawer from '@/components/ui/CartDrawer'

export default function Navbar() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { itemCount } = useCart()
  const { itemCount: wishlistCount } = useWishlist()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCartDrawerOpen(true)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
          isScrolled ? 'shadow-md' : ''
        )}
      >
        {/* Top Bar */}
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

        {/* Main Navigation */}
        <nav className="border-b border-[#ebebeb]">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-[70px] sm:h-[80px]">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-[26px] sm:text-[30px] font-bold text-[#000] tracking-tight hover:text-[#a749ff] transition-colors">
                  Sellora
                </h1>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                <div className="flex items-center gap-8 xl:gap-10">
                  {NAV_LINKS.map((link) => (
                    <div
                      key={link.href}
                      className="relative group"
                      onMouseEnter={() => link.submenu && setOpenDropdown(link.href)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 text-[15px] font-medium text-[#000] hover:text-[#a749ff] transition-colors py-2"
                      >
                        {link.label}
                        {(link.submenu || link.megaMenu) && (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </Link>
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#a749ff] group-hover:w-full transition-all duration-300" />

                      {/* Dropdown Menu */}
                      {link.submenu && (
                        <div
                          className={cn(
                            'absolute top-full left-0 mt-0 w-56 bg-white border border-[#ebebeb] shadow-lg transition-all duration-200 z-50',
                            openDropdown === link.href
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2'
                          )}
                        >
                          <div className="py-2">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-5 py-2.5 text-[14px] text-[#555] hover:text-[#a749ff] hover:bg-[#f6f6f6] transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label="Search products"
                >
                  <Search className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                </button>

                <Link
                  href="/about"
                  className="p-2 hover:text-[#a749ff] transition-colors relative group hidden sm:block"
                  aria-label="About us"
                >
                  <User className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                </Link>

                <Link
                  href="/wishlist"
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
                >
                  <Heart className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#a749ff] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleCartClick}
                  className="p-2 hover:text-[#a749ff] transition-colors relative group"
                  aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
                >
                  <ShoppingCart className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] text-[#000] group-hover:text-[#a749ff]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#a749ff] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-medium">
                      {itemCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 hover:text-[#a749ff] transition-colors lg:hidden ml-1"
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
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
              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-[#ebebeb] focus:border-[#a749ff] focus:outline-none text-[15px] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#a749ff] transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={cn(
              'lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#ebebeb] shadow-lg transition-all duration-300 overflow-hidden',
              isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
            )}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[15px] font-medium text-[#000] hover:text-[#a749ff] py-3 border-b border-[#ebebeb] transition-colors block"
                    >
                      {link.label}
                    </Link>
                    {link.submenu && (
                      <div className="pl-4 bg-[#f6f6f6]">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[14px] text-[#555] hover:text-[#a749ff] py-2.5 border-b border-[#ebebeb] last:border-b-0 transition-colors block"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[110px] sm:h-[120px]" />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
    </>
  )
}
