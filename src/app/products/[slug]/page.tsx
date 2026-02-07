'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ShoppingCart, Heart, Truck, Shield, ChevronRight, Minus, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import ProductGrid from '@/components/products/ProductGrid'
import ProductImageGallery from '@/components/product/ProductImageGallery'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { sampleProducts } from '@/data/products'

type DetailTab = 'description' | 'reviews' | 'shipping'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = sampleProducts.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<DetailTab>('description')

  const { addToCart, isInCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0

  const inWishlist = isInWishlist(product.id)
  const inCartAlready = isInCart(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const relatedProducts = sampleProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const tabs: { key: DetailTab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'reviews', label: `Reviews (${product.reviews})` },
    { key: 'shipping', label: 'Shipping & Returns' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-10 sm:py-14 text-center">
          <h1 className="text-[24px] sm:text-[32px] font-bold text-[#000] mb-4 line-clamp-1">
            {product.name}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <Link href="/shop" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20">
          {/* Images */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              badge={product.badge}
              discount={discount}
              view360Images={product.view360Images}
            />
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#000] mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" showCount />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#ebebeb]">
              <span className="text-[28px] font-bold text-[#a749ff]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-[18px] text-[#8e8e8e] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#ef4444] text-white px-2 py-1 text-[12px] font-medium">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[14px] sm:text-[15px] text-[#555] mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#000] mb-3">
                  Color: <span className="font-normal text-[#555]">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-[#a749ff] scale-110'
                          : 'border-[#ebebeb] hover:border-[#a749ff]'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-[14px] font-medium text-[#000] mb-3">
                  Size: <span className="font-normal text-[#555]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2.5 border text-[13px] font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-[#a749ff] text-white border-[#a749ff]'
                          : 'bg-white text-[#555] border-[#ebebeb] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-[#ebebeb]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-[#555] hover:text-[#a749ff] hover:bg-[#f6f6f6] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-14 text-center text-[15px] font-medium text-[#000]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="w-12 h-12 flex items-center justify-center text-[#555] hover:text-[#a749ff] hover:bg-[#f6f6f6] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {inCartAlready ? 'Added to Cart' : 'Add to Cart'}
              </Button>

              <button
                onClick={handleToggleWishlist}
                className={`w-12 h-12 flex items-center justify-center border transition-all ${
                  inWishlist
                    ? 'bg-[#a749ff] border-[#a749ff] text-white'
                    : 'border-[#ebebeb] text-[#555] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff]'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t border-[#ebebeb] pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#000]">Free Shipping</p>
                  <p className="text-[13px] text-[#555]">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#f6f6f6] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#000]">Secure Payment</p>
                  <p className="text-[13px] text-[#555]">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description / Reviews / Shipping Tabs */}
        <div className="mb-16 sm:mb-20">
          <div className="flex border-b border-[#ebebeb] mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 text-[14px] sm:text-[15px] font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
                  activeTab === tab.key
                    ? 'text-[#a749ff] border-[#a749ff]'
                    : 'text-[#555] border-transparent hover:text-[#a749ff]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-6">
                {product.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-[#f6f6f6] p-4">
                  <p className="text-[14px] font-medium text-[#000] mb-1">Category</p>
                  <p className="text-[14px] text-[#555]">{product.category}</p>
                </div>
                <div className="bg-[#f6f6f6] p-4">
                  <p className="text-[14px] font-medium text-[#000] mb-1">Availability</p>
                  <p className="text-[14px] text-[#555]">
                    {product.inventory > 0
                      ? `In Stock (${product.inventory} available)`
                      : 'Out of Stock'}
                  </p>
                </div>
                {product.tags.length > 0 && (
                  <div className="bg-[#f6f6f6] p-4 sm:col-span-2">
                    <p className="text-[14px] font-medium text-[#000] mb-1">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white text-[12px] text-[#555] border border-[#ebebeb]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-8 pb-6 border-b border-[#ebebeb]">
                <div className="text-center">
                  <p className="text-[48px] font-bold text-[#000]">{product.rating}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-[13px] text-[#555] mt-1">{product.reviews} reviews</p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2
                    return (
                      <div key={star} className="flex items-center gap-2 mb-1">
                        <span className="text-[13px] text-[#555] w-4">{star}</span>
                        <div className="flex-1 h-2 bg-[#f6f6f6]">
                          <div
                            className="h-full bg-[#f59e0b]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-[#555] w-8">{pct}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                {[
                  { name: 'Sarah M.', rating: 5, date: '2 weeks ago', text: 'Absolutely love this product! The quality is exceptional and it arrived faster than expected. Would definitely recommend to anyone looking for premium quality.' },
                  { name: 'James K.', rating: 4, date: '1 month ago', text: 'Great product overall. The material feels premium and the fit is perfect. Only giving 4 stars because the color is slightly different from what I expected.' },
                  { name: 'Emily R.', rating: 5, date: '1 month ago', text: 'This exceeded my expectations. The attention to detail is remarkable and it looks even better in person. Already planning to buy more!' },
                ].map((review, i) => (
                  <div key={i} className="pb-6 border-b border-[#ebebeb] last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#a749ff] text-white flex items-center justify-center text-[14px] font-medium">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[#000]">{review.name}</p>
                          <p className="text-[12px] text-[#555]">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-[14px] text-[#555] leading-relaxed mt-3">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="text-[16px] font-semibold text-[#000] mb-3">Shipping Policy</h3>
                <ul className="space-y-2 text-[14px] text-[#555]">
                  <li>Free standard shipping on orders over $100</li>
                  <li>Standard delivery: 5-7 business days</li>
                  <li>Express delivery: 2-3 business days ($9.99)</li>
                  <li>Same day delivery available in select areas ($14.99)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#000] mb-3">Return Policy</h3>
                <ul className="space-y-2 text-[14px] text-[#555]">
                  <li>30-day return policy for all unused items</li>
                  <li>Items must be in original packaging with tags attached</li>
                  <li>Free returns on all orders</li>
                  <li>Refund processed within 5-10 business days</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-[28px] sm:text-[32px] font-bold text-[#000] mb-3">
                You May Also Like
              </h2>
              <p className="text-[14px] text-[#555]">
                Products related to what you are viewing
              </p>
            </div>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ebebeb] p-4 z-40 sm:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[14px] font-bold text-[#a749ff]">{formatPrice(product.price)}</p>
            {product.comparePrice && (
              <p className="text-[12px] text-[#8e8e8e] line-through">{formatPrice(product.comparePrice)}</p>
            )}
          </div>
          <button
            onClick={handleToggleWishlist}
            className={`w-11 h-11 flex items-center justify-center border transition-all ${
              inWishlist
                ? 'bg-[#a749ff] border-[#a749ff] text-white'
                : 'border-[#ebebeb] text-[#555]'
            }`}
          >
            <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleAddToCart}
            className={`flex-[2] py-3 text-[13px] font-medium uppercase tracking-wide transition-colors ${
              inCartAlready
                ? 'bg-[#333] text-white'
                : 'bg-[#a749ff] text-white hover:bg-[#000]'
            }`}
          >
            {inCartAlready ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
