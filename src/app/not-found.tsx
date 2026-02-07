import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-[120px] sm:text-[180px] font-bold text-[#f6f6f6] leading-none select-none">
            404
          </h1>
          <div className="-mt-10 sm:-mt-16">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#000] mb-4">
              Page Not Found
            </h2>
            <p className="text-[15px] text-[#555] max-w-md mx-auto mb-8">
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
