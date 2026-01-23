export const SITE_CONFIG = {
  name: 'Sellora',
  title: 'Sellora - Premium Ecommerce Store',
  description: 'Discover premium quality products at Sellora. Shop the latest trends in fashion, electronics, home decor, and more.',
  url: 'https://sellora.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/sellora',
    facebook: 'https://facebook.com/sellora',
    instagram: 'https://instagram.com/sellora',
  },
}

export const NAV_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Shop',
    href: '/shop',
    megaMenu: true,
  },
  {
    label: 'Categories',
    href: '/categories',
    submenu: [
      { label: "Women's Fashion", href: '/categories/womens-fashion' },
      { label: "Men's Fashion", href: '/categories/mens-fashion' },
      { label: 'Electronics', href: '/categories/electronics' },
      { label: 'Home & Living', href: '/categories/home-living' },
      { label: 'Beauty', href: '/categories/beauty' },
      { label: 'Sports', href: '/categories/sports' },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const FOOTER_LINKS = {
  shop: [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'Best Sellers', href: '/shop?filter=popular' },
    { label: 'Sale', href: '/shop?filter=sale' },
    { label: 'All Products', href: '/shop' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
  ],
  support: [
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Size Guide', href: '/size-guide' },
    { label: 'Track Order', href: '/track-order' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
]

export const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const PRICE_RANGES = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Over $200', min: 200, max: Infinity },
]
