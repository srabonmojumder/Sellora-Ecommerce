'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Maximize2, Image as ImageIcon, RotateCw } from 'lucide-react'
import ImageZoom from './ImageZoom'
import Lightbox from './Lightbox'
import ImageCarousel from './ImageCarousel'
import Product360View from './Product360View'
import Badge from '@/components/ui/Badge'

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  badge?: 'new' | 'sale' | 'hot'
  discount?: number
  view360Images?: string[]
}

type ViewMode = 'zoom' | 'carousel' | '360'

export default function ProductImageGallery({
  images,
  productName,
  badge,
  discount,
  view360Images = [],
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [viewMode, setViewMode] = useState<ViewMode>('zoom')
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const has360View = view360Images.length > 0

  const openLightbox = (index?: number) => {
    if (index !== undefined) {
      setSelectedImage(index)
    }
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* View Mode Switcher */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto">
          <button
            onClick={() => setViewMode('zoom')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-sm font-medium transition-all whitespace-nowrap ${
              viewMode === 'zoom'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
            Zoom
          </button>
          <button
            onClick={() => setViewMode('carousel')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-sm font-medium transition-all whitespace-nowrap ${
              viewMode === 'carousel'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            Carousel
          </button>
          {has360View && (
            <button
              onClick={() => setViewMode('360')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-sm font-medium transition-all whitespace-nowrap ${
                viewMode === '360'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              360°
            </button>
          )}
        </div>

        <button
          onClick={() => openLightbox(selectedImage)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-[12px] sm:text-sm font-medium text-neutral-900 transition-colors flex-shrink-0"
          aria-label="Open fullscreen gallery"
        >
          <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>

      {/* Gallery Views */}
      {viewMode === 'zoom' && (
        <div className="space-y-4">
          {/* Main Image with Zoom */}
          <div className="relative aspect-square bg-neutral-100 rounded-lg overflow-hidden">
            <ImageZoom
              src={images[selectedImage]}
              alt={`${productName} - Image ${selectedImage + 1}`}
              onImageClick={() => openLightbox(selectedImage)}
              className="w-full h-full"
            />
            {badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant={badge}>{badge}</Badge>
              </div>
            )}
            {discount && discount > 0 && (
              <div className="absolute top-4 left-4 mt-12 z-10">
                <Badge variant="sale">-{discount}%</Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-neutral-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-neutral-900 ring-2 ring-neutral-900 ring-offset-2'
                      : 'border-transparent hover:border-neutral-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productName} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {viewMode === 'carousel' && (
        <div className="relative">
          <ImageCarousel
            images={images}
            productName={productName}
            autoPlay={false}
            onImageClick={openLightbox}
          />
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <Badge variant={badge}>{badge}</Badge>
            </div>
          )}
          {discount && discount > 0 && (
            <div className="absolute top-4 left-4 mt-12 z-10">
              <Badge variant="sale">-{discount}%</Badge>
            </div>
          )}
        </div>
      )}

      {viewMode === '360' && has360View && (
        <Product360View
          images={view360Images}
          productName={productName}
          autoRotate={false}
        />
      )}

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={selectedImage}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        productName={productName}
      />
    </div>
  )
}
