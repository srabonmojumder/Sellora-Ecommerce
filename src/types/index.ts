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
