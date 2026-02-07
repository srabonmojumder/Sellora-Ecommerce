import Link from 'next/link'
import Image from 'next/image'

interface BannerProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
  bgColor?: string
  imagePosition?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
}

export default function Banner({
  title,
  subtitle,
  buttonText,
  buttonLink,
  bgColor = '#f6f6f6',
  imagePosition = 'right',
  size = 'medium',
}: BannerProps) {
  const heightClass = {
    small: 'min-h-[200px] sm:min-h-[250px]',
    medium: 'min-h-[280px] sm:min-h-[350px]',
    large: 'min-h-[350px] sm:min-h-[450px]',
  }

  return (
    <div
      className={`relative overflow-hidden ${heightClass[size]}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto px-4 h-full">
        <div
          className={`flex flex-col ${
            imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          } items-center justify-between h-full py-8 sm:py-12 gap-6 lg:gap-8`}
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {subtitle && (
              <span className="text-[13px] sm:text-[14px] text-[#555] uppercase tracking-[2px] mb-2 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-bold text-[#000] mb-4 sm:mb-6 leading-tight">
              {title}
            </h2>
            <Link
              href={buttonLink}
              className="inline-block bg-[#a749ff] text-white px-8 sm:px-10 py-3 sm:py-4 text-[13px] sm:text-[14px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
            >
              {buttonText}
            </Link>
          </div>

          {/* Decorative Visual */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-[140px] h-[140px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px]">
              <div className="w-full h-full bg-gradient-to-br from-[#a749ff]/20 to-[#a749ff]/5 rounded-full flex items-center justify-center">
                <div className="w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#a749ff]/30 via-[#d896ff]/20 to-transparent flex items-center justify-center">
                  <div className="w-[55%] h-[55%] rounded-full bg-gradient-to-br from-[#a749ff]/40 to-[#e2b0ff]/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Flone-style Image Banners Grid
interface ImageBannerProps {
  items: {
    title: string
    subtitle?: string
    link: string
    bgColor: string
  }[]
}

export function ImageBannerGrid({ items }: ImageBannerProps) {
  const gradients = [
    'from-[#ec4899]/30 via-[#a749ff]/20 to-transparent',
    'from-[#3b82f6]/30 via-[#a749ff]/20 to-transparent',
    'from-[#f59e0b]/30 via-[#a749ff]/20 to-transparent',
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`group relative overflow-hidden min-h-[160px] sm:min-h-[280px] ${index === 2 ? 'col-span-2 lg:col-span-1' : ''}`}
          style={{ backgroundColor: item.bgColor }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            {item.subtitle && (
              <span className="text-[10px] sm:text-[13px] text-[#555] uppercase tracking-[1px] sm:tracking-[2px] mb-1 sm:mb-2">
                {item.subtitle}
              </span>
            )}
            <h3 className="text-[18px] sm:text-[26px] font-bold text-[#000] mb-2 sm:mb-4 group-hover:text-[#a749ff] transition-colors">
              {item.title}
            </h3>
            <span className="text-[11px] sm:text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors">
              Shop Now
            </span>
          </div>
          {/* Decorative gradient circle */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] opacity-30 group-hover:opacity-50 transition-opacity">
            <div className={`w-full h-full rounded-full bg-gradient-to-tr ${gradients[index] || gradients[0]}`} />
          </div>
        </Link>
      ))}
    </div>
  )
}

// Countdown Banner for Sales
interface CountdownBannerProps {
  title: string
  subtitle: string
  endDate: string
  buttonText: string
  buttonLink: string
}

export function CountdownBanner({
  title,
  subtitle,
  buttonText,
  buttonLink,
}: CountdownBannerProps) {
  return (
    <div className="bg-[#f1f1f1] py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[13px] sm:text-[14px] text-[#555] uppercase tracking-[3px] mb-3 block">
            {subtitle}
          </span>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold text-[#000] mb-6 sm:mb-8">
            {title}
          </h2>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            {[
              { value: '00', label: 'Days' },
              { value: '00', label: 'Hours' },
              { value: '00', label: 'Mins' },
              { value: '00', label: 'Secs' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white flex items-center justify-center mb-2">
                  <span className="text-[24px] sm:text-[32px] font-bold text-[#000]">
                    {item.value}
                  </span>
                </div>
                <span className="text-[11px] sm:text-[12px] text-[#555] uppercase tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href={buttonLink}
            className="inline-block bg-[#a749ff] text-white px-10 sm:px-12 py-3.5 sm:py-4 text-[14px] font-semibold uppercase tracking-wider hover:bg-[#000] transition-all duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}

// Feature/Service Icons Banner
interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface FeatureBannerProps {
  features: FeatureItem[]
}

export function FeatureBanner({ features }: FeatureBannerProps) {
  return (
    <div className="bg-white border-t border-b border-[#ebebeb] py-6 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 group text-center sm:text-left">
              <div className="flex-shrink-0 w-11 h-11 sm:w-16 sm:h-16 bg-[#f6f6f6] flex items-center justify-center text-[#a749ff] group-hover:bg-[#a749ff] group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <div>
                <h4 className="text-[13px] sm:text-[16px] font-semibold text-[#000] mb-0.5 sm:mb-1">
                  {feature.title}
                </h4>
                <p className="text-[11px] sm:text-[13px] text-[#555] hidden sm:block">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
