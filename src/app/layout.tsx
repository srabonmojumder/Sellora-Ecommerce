import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import { SITE_CONFIG } from '@/lib/constants'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ToastProvider } from '@/context/ToastContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ToastContainer from '@/components/ui/ToastContainer'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: ['ecommerce', 'online shopping', 'premium products', 'fashion', 'electronics'],
  authors: [{ name: 'Sellora' }],
  creator: 'Sellora',
  publisher: 'Sellora',
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@sellora',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-white">
        <ToastProvider>
          <CurrencyProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <main className="min-h-screen pt-[116px] relative">
                  {children}
                </main>
                <Footer />
                <ToastContainer />
              </WishlistProvider>
            </CartProvider>
          </CurrencyProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
