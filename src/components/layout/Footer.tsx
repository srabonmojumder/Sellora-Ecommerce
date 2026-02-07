'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react'
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants'
import { useToast } from '@/context/ToastContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const { success } = useToast()

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim()) return
    success('Thank you for subscribing to our newsletter!')
    setEmail('')
  }

  return (
    <footer className="bg-[#f6f6f6]">
      {/* Newsletter Section - Flone Style */}
      <div className="bg-[#a749ff]">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-white mb-2">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-white/80 text-[14px] sm:text-[15px]">
                Get all the latest information on Events, Sales and Offers.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md lg:max-w-none mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 sm:px-5 py-3.5 text-[16px] sm:text-[14px] text-[#333] bg-white border-none focus:outline-none focus:ring-2 focus:ring-white/50 min-w-0 sm:min-w-[280px]"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#000] text-white text-[14px] font-semibold uppercase tracking-wide hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-[28px] font-bold text-[#000] hover:text-[#a749ff] transition-colors">
                Sellora
              </h2>
            </Link>
            <p className="text-[#555] text-[14px] leading-relaxed mb-6">
              Sellora is your premier destination for curated fashion, electronics, and lifestyle products. We bring you quality items from trusted brands worldwide.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a
                href={SITE_CONFIG.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white text-[#555] hover:bg-[#a749ff] hover:text-white transition-all duration-300 rounded"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white text-[#555] hover:bg-[#a749ff] hover:text-white transition-all duration-300 rounded"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white text-[#555] hover:bg-[#a749ff] hover:text-white transition-all duration-300 rounded"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                title="Coming soon"
                className="w-10 h-10 flex items-center justify-center bg-white text-[#555] hover:bg-[#a749ff] hover:text-white transition-all duration-300 rounded"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[18px] font-semibold text-[#000] mb-6 uppercase tracking-wide">
              Useful Links
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#555] text-[14px] hover:text-[#a749ff] hover:pl-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[18px] font-semibold text-[#000] mb-6 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#555] text-[14px] hover:text-[#a749ff] hover:pl-1 transition-all duration-300 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[18px] font-semibold text-[#000] mb-6 uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="text-[#555] text-[14px]">
                <span className="block text-[#000] font-medium mb-1">Address:</span>
                123 Street, City, Country
              </li>
              <li className="text-[#555] text-[14px]">
                <span className="block text-[#000] font-medium mb-1">Phone:</span>
                <a href="tel:+1234567890" className="hover:text-[#a749ff] transition-colors">
                  +1 234 567 890
                </a>
              </li>
              <li className="text-[#555] text-[14px]">
                <span className="block text-[#000] font-medium mb-1">Email:</span>
                <a href="mailto:info@sellora.com" className="hover:text-[#a749ff] transition-colors">
                  info@sellora.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#555] text-[14px] text-center sm:text-left">
              &copy; {currentYear} <span className="text-[#a749ff] font-medium">Sellora</span>. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#555] text-[13px] hover:text-[#a749ff] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
