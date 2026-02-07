'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  RotateCcw,
  Package,
  CheckCircle2,
  Clock,
  Facebook,
  Twitter,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import ProductGrid from '@/components/products/ProductGrid'
import ProductImageGallery from '@/components/product/ProductImageGallery'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { sampleProducts } from '@/data/products'

type DetailTab = 'description' | 'reviews' | 'shipping' | 'additional'

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
  const { success } = useToast()

  const discount = product.comparePrice
    ? calculateDiscount(product.price, product.comparePrice)
    : 0

  const inWishlist = isInWishlist(product.id)
  const inCartAlready = isInCart(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor)
    success(`${product.name} added to cart!`)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
      success(`${product.name} added to wishlist!`)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      success('Link copied to clipboard!')
    }
  }

  const relatedProducts = sampleProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const tabs: { key: DetailTab; label: string }[] = [
    { key: 'description', label: 'Description' },
    { key: 'additional', label: 'Additional Info' },
    { key: 'reviews', label: `Reviews (${product.reviews})` },
    { key: 'shipping', label: 'Shipping & Returns' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-6 sm:py-14 text-center">
          <h1 className="text-[20px] sm:text-[32px] font-bold text-[#000] mb-2 sm:mb-4 line-clamp-1">
            {product.name}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-[12px] sm:text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#555]" />
            <Link href="/shop" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Shop
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#555]" />
            <span className="text-[#a749ff] truncate max-w-[120px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-16 lg:py-20">
        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-12 sm:mb-20">
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
            {/* Badge */}
            {product.badge && (
              <span
                className={`inline-block px-3 py-1 text-[11px] font-medium uppercase text-white mb-3 ${
                  product.badge === 'new'
                    ? 'bg-[#22c55e]'
                    : product.badge === 'sale'
                    ? 'bg-[#ef4444]'
                    : 'bg-[#f59e0b]'
                }`}
              >
                {product.badge}
              </span>
            )}

            <h2 className="text-[20px] sm:text-[28px] lg:text-[32px] font-bold text-[#000] mb-3 sm:mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <StarRating rating={product.rating} reviews={product.reviews} size="md" showCount />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-[#ebebeb]">
              <span className="text-[24px] sm:text-[28px] font-bold text-[#a749ff]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-[18px] text-[#8e8e8e] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="bg-[#ef4444] text-white px-2 py-1 text-[12px] font-medium">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[13px] sm:text-[15px] text-[#555] mb-5 sm:mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[13px] font-medium text-[#22c55e]">
                    In Stock ({product.inventory} available)
                  </span>
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4 text-[#ef4444]" />
                  <span className="text-[13px] font-medium text-[#ef4444]">Out of Stock</span>
                </>
              )}
            </div>

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
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

            {/* Share & Social */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#ebebeb]">
              <span className="text-[13px] font-medium text-[#000]">Share:</span>
              <button
                onClick={handleShare}
                className="w-9 h-9 flex items-center justify-center border border-[#ebebeb] text-[#555] hover:bg-[#a749ff] hover:text-white hover:border-[#a749ff] transition-all"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-9 h-9 flex items-center justify-center border border-[#ebebeb] text-[#555] hover:bg-[#3b5998] hover:text-white hover:border-[#3b5998] transition-all"
                title="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                className="w-9 h-9 flex items-center justify-center border border-[#ebebeb] text-[#555] hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-all"
                title="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
            </div>

            {/* Product Meta */}
            <div className="space-y-2 mb-8">
              <p className="text-[13px] text-[#555]">
                <span className="font-medium text-[#000]">SKU:</span> {product.sku}
              </p>
              <p className="text-[13px] text-[#555]">
                <span className="font-medium text-[#000]">Category:</span>{' '}
                <Link href="/shop" className="hover:text-[#a749ff] transition-colors">
                  {product.category}
                </Link>
              </p>
              {product.tags.length > 0 && (
                <p className="text-[13px] text-[#555]">
                  <span className="font-medium text-[#000]">Tags:</span>{' '}
                  {product.tags.map((tag, i) => (
                    <span key={tag}>
                      <Link href="/shop" className="hover:text-[#a749ff] transition-colors capitalize">
                        {tag}
                      </Link>
                      {i < product.tags.length - 1 && ', '}
                    </span>
                  ))}
                </p>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f6f6f6] p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#000]">Free Shipping</p>
                  <p className="text-[12px] text-[#555]">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#000]">Secure Payment</p>
                  <p className="text-[12px] text-[#555]">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#000]">Easy Returns</p>
                  <p className="text-[12px] text-[#555]">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#a749ff]" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#000]">Quality Guaranteed</p>
                  <p className="text-[12px] text-[#555]">Premium materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description / Additional / Reviews / Shipping Tabs */}
        <div className="mb-16 sm:mb-20">
          <div className="flex border-b border-[#ebebeb] mb-6 sm:mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-[13px] sm:text-[15px] font-medium whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
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
            <div className="max-w-4xl">
              <h3 className="text-[18px] sm:text-[22px] font-bold text-[#000] mb-4">
                About This Product
              </h3>
              <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-6">
                {product.description}
              </p>
              <p className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-8">
                Crafted with care and attention to detail, this product is designed to meet the highest standards
                of quality and comfort. Whether you&apos;re looking for everyday essentials or something special,
                this item delivers on both style and functionality.
              </p>

              {/* Key Highlights */}
              <h4 className="text-[16px] font-semibold text-[#000] mb-4">Key Highlights</h4>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#000]">Premium Quality</p>
                    <p className="text-[13px] text-[#555]">Made from high-quality materials for lasting durability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#000]">Comfortable Fit</p>
                    <p className="text-[13px] text-[#555]">Designed for all-day comfort and ease of movement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#000]">Versatile Style</p>
                    <p className="text-[13px] text-[#555]">Perfect for casual and semi-formal occasions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[14px] font-medium text-[#000]">Easy Care</p>
                    <p className="text-[13px] text-[#555]">Machine washable and easy to maintain</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="max-w-3xl">
              <h3 className="text-[18px] sm:text-[22px] font-bold text-[#000] mb-6">
                Additional Information
              </h3>
              <table className="w-full text-[14px]">
                <tbody>
                  <tr className="border-b border-[#ebebeb]">
                    <td className="py-4 pr-4 font-medium text-[#000] w-[140px] sm:w-[200px]">SKU</td>
                    <td className="py-4 text-[#555]">{product.sku}</td>
                  </tr>
                  <tr className="border-b border-[#ebebeb]">
                    <td className="py-4 pr-4 font-medium text-[#000]">Category</td>
                    <td className="py-4 text-[#555]">{product.category}</td>
                  </tr>
                  {product.colors && product.colors.length > 0 && (
                    <tr className="border-b border-[#ebebeb]">
                      <td className="py-4 pr-4 font-medium text-[#000]">Available Colors</td>
                      <td className="py-4 text-[#555]">
                        <div className="flex items-center gap-2 flex-wrap">
                          {product.colors.map((color) => (
                            <span key={color.name} className="flex items-center gap-1.5">
                              <span
                                className="w-4 h-4 border border-[#ebebeb] inline-block"
                                style={{ backgroundColor: color.hex }}
                              />
                              {color.name}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <tr className="border-b border-[#ebebeb]">
                      <td className="py-4 pr-4 font-medium text-[#000]">Available Sizes</td>
                      <td className="py-4 text-[#555]">{product.sizes.join(', ')}</td>
                    </tr>
                  )}
                  <tr className="border-b border-[#ebebeb]">
                    <td className="py-4 pr-4 font-medium text-[#000]">Availability</td>
                    <td className="py-4">
                      {product.inStock ? (
                        <span className="text-[#22c55e] font-medium">In Stock ({product.inventory} available)</span>
                      ) : (
                        <span className="text-[#ef4444] font-medium">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                  {product.tags.length > 0 && (
                    <tr className="border-b border-[#ebebeb]">
                      <td className="py-4 pr-4 font-medium text-[#000]">Tags</td>
                      <td className="py-4">
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-[#f6f6f6] text-[12px] text-[#555] border border-[#ebebeb] capitalize"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#ebebeb]">
                <div className="text-center flex-shrink-0">
                  <p className="text-[36px] sm:text-[48px] font-bold text-[#000]">{product.rating}</p>
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
                  { name: 'Michael T.', rating: 5, date: '2 months ago', text: 'Perfect fit and excellent quality. The shipping was fast and the packaging was great. Very satisfied with my purchase.' },
                  { name: 'Lisa W.', rating: 4, date: '2 months ago', text: 'Really nice product. Comfortable to wear and looks exactly like the photos. Would have given 5 stars but the sizing runs a bit small.' },
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
            <div className="max-w-3xl space-y-8">
              <div>
                <h3 className="text-[16px] font-semibold text-[#000] mb-4">Shipping Policy</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                    <Truck className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-[#000]">Free Standard Shipping</p>
                      <p className="text-[13px] text-[#555]">On all orders over $100. Delivery in 5-7 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                    <Package className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-[#000]">Express Delivery — $9.99</p>
                      <p className="text-[13px] text-[#555]">Get your order in 2-3 business days.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                    <Clock className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-[#000]">Same Day Delivery — $14.99</p>
                      <p className="text-[13px] text-[#555]">Available in select metropolitan areas.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#000] mb-4">Return Policy</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-[#f6f6f6] p-4">
                    <RotateCcw className="w-5 h-5 text-[#a749ff] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[14px] font-medium text-[#000]">30-Day Free Returns</p>
                      <p className="text-[13px] text-[#555]">
                        Return any unused item within 30 days for a full refund. Items must be in original packaging with tags attached. Refunds processed within 5-10 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="pb-16 sm:pb-0">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-[22px] sm:text-[32px] font-bold text-[#000] mb-3">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ebebeb] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] z-40 sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2">
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
