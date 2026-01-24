'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

interface LightboxProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  productName: string
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  productName,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    setActiveIndex(currentIndex)
    setZoom(1)
  }, [currentIndex, isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, activeIndex])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    setZoom(1)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    setZoom(1)
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 1}
          className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-6 h-6 text-white" />
        </button>
        <div className="w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 rounded-full">
          <span className="text-white text-sm font-medium">{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 bg-white bg-opacity-10 rounded-full">
        <span className="text-white text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* Previous Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Main Image */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-auto p-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          className="relative transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            width: '100%',
            maxWidth: '1200px',
            aspectRatio: '1',
          }}
        >
          <Image
            src={images[activeIndex]}
            alt={`${productName} - Image ${activeIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-full overflow-x-auto px-4 py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index)
                setZoom(1)
              }}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === index
                  ? 'border-white scale-110'
                  : 'border-transparent opacity-60 hover:opacity-100'
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
  )
}
