'use client'

import { useState, useRef, MouseEvent, TouchEvent } from 'react'
import Image from 'next/image'
import { RotateCw, Hand } from 'lucide-react'

interface Product360ViewProps {
  images: string[]
  productName: string
  autoRotate?: boolean
  rotationSpeed?: number
}

export default function Product360View({
  images,
  productName,
  autoRotate = false,
  rotationSpeed = 50,
}: Product360ViewProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(autoRotate)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  const totalFrames = images.length

  // Auto rotation effect
  if (isAutoRotating && !autoRotateRef.current) {
    autoRotateRef.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames)
    }, rotationSpeed)
  }

  if (!isAutoRotating && autoRotateRef.current) {
    clearInterval(autoRotateRef.current)
    autoRotateRef.current = null
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.pageX)
    setIsAutoRotating(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = e.pageX - startX
    const sensitivity = 5
    const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity)

    if (framesToMove > 0) {
      if (deltaX > 0) {
        setCurrentFrame((prev) => (prev + framesToMove) % totalFrames)
      } else {
        setCurrentFrame((prev) => (prev - framesToMove + totalFrames) % totalFrames)
      }
      setStartX(e.pageX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX)
    setIsAutoRotating(false)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const deltaX = e.touches[0].pageX - startX
    const sensitivity = 5
    const framesToMove = Math.floor(Math.abs(deltaX) / sensitivity)

    if (framesToMove > 0) {
      if (deltaX > 0) {
        setCurrentFrame((prev) => (prev + framesToMove) % totalFrames)
      } else {
        setCurrentFrame((prev) => (prev - framesToMove + totalFrames) % totalFrames)
      }
      setStartX(e.touches[0].pageX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating)
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className={`relative aspect-square bg-neutral-100 rounded-lg overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-100 ${
                index === currentFrame ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - 360° View Frame ${index + 1}`}
                fill
                className="object-cover pointer-events-none select-none"
                priority={index === 0}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* 360 Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 bg-black bg-opacity-50 rounded-full">
          <RotateCw className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-medium">360° View</span>
        </div>

        {/* Drag Instruction */}
        {!isDragging && !isAutoRotating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-3 bg-black bg-opacity-60 rounded-lg animate-pulse">
              <Hand className="w-5 h-5 text-white" />
              <span className="text-white text-sm font-medium">Drag to rotate</span>
            </div>
          </div>
        )}

        {/* Auto Rotate Toggle */}
        <button
          onClick={toggleAutoRotate}
          className={`absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all ${
            isAutoRotating
              ? 'bg-primary-500 text-white'
              : 'bg-white text-neutral-900 hover:bg-neutral-100'
          }`}
          aria-label={isAutoRotating ? 'Stop auto rotation' : 'Start auto rotation'}
        >
          <RotateCw className={`w-5 h-5 ${isAutoRotating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all duration-100"
          style={{ width: `${((currentFrame + 1) / totalFrames) * 100}%` }}
        />
      </div>

      {/* Frame Counter */}
      <div className="text-center text-sm text-neutral-600">
        Frame {currentFrame + 1} of {totalFrames}
      </div>
    </div>
  )
}
