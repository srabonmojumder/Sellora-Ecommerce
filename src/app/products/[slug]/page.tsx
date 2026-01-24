'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ProductGrid from '@/components/products/ProductGrid'
import ProductImageGallery from '@/components/product/ProductImageGallery'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { sampleProducts } from '@/data/products'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = sampleProducts.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '')
  const [quantity, setQuantity] = useState(1)

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

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-neutral-600 hover:text-neutral-900">
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <Link href="/shop" className="text-neutral-600 hover:text-neutral-900">
              Shop
            </Link>
            <span className="text-neutral-400">/</span>
            <Link href={`/shop?category=${product.category}`} className="text-neutral-600 hover:text-neutral-900">
              {product.category}
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
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
            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-accent-gold fill-current'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-xl text-neutral-400 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color.name
                          ? 'border-neutral-900 scale-110'
                          : 'border-neutral-300 hover:border-neutral-500'
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
                <label className="block text-sm font-medium text-neutral-900 mb-3">
                  Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  -
                </button>
                <span className="w-16 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="w-10 h-10 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                size="lg"
                fullWidth
                className="flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {inCartAlready ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <button
                onClick={handleToggleWishlist}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-lg transition-all ${
                  inWishlist
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'border-neutral-300 hover:border-neutral-900'
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 border-t border-neutral-200 pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Free Shipping</p>
                  <p className="text-sm text-neutral-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Secure Payment</p>
                  <p className="text-sm text-neutral-600">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  )
}
