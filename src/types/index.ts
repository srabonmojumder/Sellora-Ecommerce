// Product Types
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice?: number
  images: string[]
  category: string
  subcategory?: string
  tags: string[]
  badge?: 'new' | 'sale' | 'hot'
  discount?: number
  rating: number
  reviews: number
  inStock: boolean
  inventory: number
  variants?: ProductVariant[]
  sizes?: string[]
  colors?: ProductColor[]
  sku: string
  createdAt: string
}

export interface ProductVariant {
  id: string
  size?: string
  color?: string
  price: number
  inventory: number
  sku: string
}

export interface ProductColor {
  name: string
  hex: string
  image?: string
}

// Cart Types
export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
  variant?: ProductVariant
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
}

// Wishlist Types
export interface WishlistItem {
  id: string
  product: Product
  addedAt: string
}

// Category Types
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image: string
  productCount: number
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  productCount: number
}

// Filter & Sort Types
export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  tags: string[]
  inStock: boolean
  onSale: boolean
}

export type SortOption =
  | 'default'
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'rating'
  | 'popular'

// Blog Types
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: Author
  category: string
  tags: string[]
  publishedAt: string
  readTime: number
}

export interface Author {
  name: string
  avatar: string
  bio?: string
}

// Checkout Types
export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'cod'
  cardNumber?: string
  cardName?: string
  expiryDate?: string
  cvv?: string
}

export interface Order {
  id: string
  items: CartItem[]
  shippingAddress: ShippingAddress
  paymentMethod: PaymentMethod
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
}

// UI Component Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type BadgeVariant = 'new' | 'sale' | 'hot' | 'default'

// SEO Types
export interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
}

// Toast Notification Types
export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

// Currency Types
export interface Currency {
  code: string
  symbol: string
  rate: number
}

// Review Types
export interface Review {
  id: string
  productId: string
  author: {
    name: string
    avatar?: string
    verified: boolean
  }
  rating: number
  title: string
  comment: string
  images?: string[]
  helpful: number
  createdAt: string
}

// Coupon Types
export interface Coupon {
  code: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minPurchase?: number
  expiresAt: string
  usageLimit?: number
}

// User & Auth Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  addresses: ShippingAddress[]
  createdAt: string
}

// Comparison Types
export interface CompareItem {
  id: string
  product: Product
  addedAt: string
}

// Wishlist Collection Types
export interface WishlistCollection {
  id: string
  name: string
  items: WishlistItem[]
  createdAt: string
}

// Order Tracking Types
export interface OrderTracking {
  orderId: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  timeline: OrderEvent[]
}

export interface OrderEvent {
  status: string
  timestamp: string
  location?: string
  description: string
}

// Recently Viewed Types
export interface RecentlyViewedItem {
  product: Product
  viewedAt: string
}

// Stock Notification Types
export interface StockNotification {
  productId: string
  email: string
  createdAt: string
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string
  subscribedAt: string
}

// View Mode Type
export type ViewMode = 'grid' | 'list'

// Shipping Option Types
export interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
}
