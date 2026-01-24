import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Ultra-Modern Newsletter Section */}
      <div className="relative overflow-hidden border-b border-white/5">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary-500/20 to-transparent rounded-full blur-3xl animate-float"
             style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl animate-morph" />

        <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 glass-dark rounded-full mb-6 shadow-2xl hover:scale-105 transition-transform border-2 border-white/10">
              <Mail className="w-5 h-5 text-primary-400 animate-pulse-soft" />
              <span className="text-base font-black bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                Newsletter
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6">
              Stay in the{' '}
              <span className="text-gradient-animate bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent"
                    style={{ backgroundSize: '200% auto' }}>
                Loop
              </span>
            </h3>

            <p className="text-gray-400 mb-8 sm:mb-10 text-lg sm:text-xl font-semibold">
              Get exclusive updates on new products, special offers, and more
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 glass-dark border-2 border-white/10 rounded-2xl focus:outline-none focus:border-primary-400 focus:ring-4 focus:ring-primary-400/20 transition-all text-white placeholder:text-gray-500 font-semibold text-base hover:border-white/20"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 text-white rounded-2xl hover:from-primary-700 hover:via-secondary-700 hover:to-primary-800 transition-all font-black shadow-2xl hover:shadow-primary-500/50 active:scale-95 hover:scale-105 text-base btn-modern">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Modern Footer Content */}
      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 sm:col-span-2">
            <Link href="/" className="inline-block mb-6 group relative">
              <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text group-hover:scale-105 transition-all"
                  style={{ backgroundSize: '200% auto' }}>
                Sellora
              </h2>
              <div className="absolute -inset-3 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            </Link>

            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed text-base font-medium">
              Your destination for premium quality products. We curate the best items to make your shopping experience exceptional.
            </p>

            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 glass-dark rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-primary-600 hover:to-secondary-600 transition-all hover:scale-110 active:scale-95 group border-2 border-white/10 hover:border-white/20"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={SITE_CONFIG.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 glass-dark rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-secondary-600 hover:to-accent-600 transition-all hover:scale-110 active:scale-95 group border-2 border-white/10 hover:border-white/20"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-12 h-12 glass-dark rounded-2xl flex items-center justify-center hover:bg-gradient-to-r hover:from-accent-600 hover:to-primary-600 transition-all hover:scale-110 active:scale-95 group border-2 border-white/10 hover:border-white/20"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-white font-black mb-6 text-xl flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-primary-400 to-secondary-400 rounded-full" />
              Shop
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all inline-flex items-center gap-3 group font-semibold hover:translate-x-1"
                  >
                    <span className="w-0 group-hover:w-2 h-2 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-black mb-6 text-xl flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-secondary-400 to-accent-400 rounded-full" />
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all inline-flex items-center gap-3 group font-semibold hover:translate-x-1"
                  >
                    <span className="w-0 group-hover:w-2 h-2 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-black mb-6 text-xl flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-accent-400 to-primary-400 rounded-full" />
              Support
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all inline-flex items-center gap-3 group font-semibold hover:translate-x-1"
                  >
                    <span className="w-0 group-hover:w-2 h-2 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ultra-Modern Bottom Bar */}
      <div className="border-t border-white/5 bg-black/50 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
            <p className="text-gray-400 font-semibold flex items-center gap-2">
              <span className="text-transparent bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text font-black">
                © {currentYear} Sellora.
              </span>
              <span>All rights reserved.</span>
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">
              {FOOTER_LINKS.legal.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-gray-400 hover:text-white transition-all font-bold group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>
          </div>

          {/* Made with love badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-dark rounded-full text-xs font-bold text-gray-400 border border-white/5">
              <span>Made with</span>
              <span className="text-danger animate-pulse-soft text-base">♥</span>
              <span>by Sellora Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
