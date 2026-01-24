import Image from 'next/image'
import Link from 'next/link'
import { Award, Heart, Truck, Users, ChevronRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">About Us</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">About</span>
          </nav>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="text-[13px] text-[#a749ff] uppercase tracking-[2px] mb-3 block">
                Who We Are
              </span>
              <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[15px] text-[#555] leading-relaxed">
                <p>
                  Founded in 2020, Sellora began with a simple idea: to create an online shopping destination that combines quality, style, and convenience. What started as a small operation has grown into a trusted brand serving thousands of customers worldwide.
                </p>
                <p>
                  We carefully curate every product in our collection, working directly with manufacturers and artisans to ensure the highest standards. Our team is dedicated to discovering unique items that bring value and joy to your everyday life.
                </p>
                <p>
                  Today, Sellora stands as a testament to our commitment to excellence. We&apos;re not just selling products; we&apos;re building relationships and creating experiences that our customers love and trust.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
                alt="Our team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <span className="text-[13px] text-[#a749ff] uppercase tracking-[2px] mb-3 block">
              What We Believe
            </span>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-4">
              Our Values
            </h2>
            <p className="text-[15px] text-[#555] max-w-2xl mx-auto">
              These core principles guide everything we do at Sellora
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center bg-white p-6 sm:p-8 group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#f6f6f6] group-hover:bg-[#a749ff] flex items-center justify-center mx-auto mb-5 transition-colors">
                <Award className="w-7 h-7 text-[#a749ff] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#000] mb-3">
                Quality First
              </h3>
              <p className="text-[14px] text-[#555]">
                We never compromise on quality. Every product is carefully selected and tested.
              </p>
            </div>

            <div className="text-center bg-white p-6 sm:p-8 group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#f6f6f6] group-hover:bg-[#a749ff] flex items-center justify-center mx-auto mb-5 transition-colors">
                <Heart className="w-7 h-7 text-[#a749ff] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#000] mb-3">
                Customer Love
              </h3>
              <p className="text-[14px] text-[#555]">
                Your satisfaction is our priority. We&apos;re here to help every step of the way.
              </p>
            </div>

            <div className="text-center bg-white p-6 sm:p-8 group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#f6f6f6] group-hover:bg-[#a749ff] flex items-center justify-center mx-auto mb-5 transition-colors">
                <Truck className="w-7 h-7 text-[#a749ff] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#000] mb-3">
                Fast Delivery
              </h3>
              <p className="text-[14px] text-[#555]">
                Quick and reliable shipping to get your orders to you as soon as possible.
              </p>
            </div>

            <div className="text-center bg-white p-6 sm:p-8 group hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#f6f6f6] group-hover:bg-[#a749ff] flex items-center justify-center mx-auto mb-5 transition-colors">
                <Users className="w-7 h-7 text-[#a749ff] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-[18px] font-semibold text-[#000] mb-3">
                Community
              </h3>
              <p className="text-[14px] text-[#555]">
                Building a community of satisfied customers who trust and recommend us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#000]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-[36px] sm:text-[48px] font-bold text-white mb-2">50K+</div>
              <div className="text-[14px] text-[#888] uppercase tracking-wide">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] sm:text-[48px] font-bold text-white mb-2">10K+</div>
              <div className="text-[14px] text-[#888] uppercase tracking-wide">Products</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] sm:text-[48px] font-bold text-white mb-2">100+</div>
              <div className="text-[14px] text-[#888] uppercase tracking-wide">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] sm:text-[48px] font-bold text-[#a749ff] mb-2">4.8</div>
              <div className="text-[14px] text-[#888] uppercase tracking-wide">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <span className="text-[13px] text-[#a749ff] uppercase tracking-[2px] mb-3 block">
              Our Team
            </span>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold text-[#000] mb-4">
              Meet Our Team
            </h2>
            <p className="text-[15px] text-[#555] max-w-2xl mx-auto">
              The passionate people behind Sellora
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/400?img=1' },
              { name: 'Michael Chen', role: 'Head of Operations', image: 'https://i.pravatar.cc/400?img=12' },
              { name: 'Emily Brown', role: 'Creative Director', image: 'https://i.pravatar.cc/400?img=5' },
            ].map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-5 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-[18px] font-semibold text-[#000] mb-1 group-hover:text-[#a749ff] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[14px] text-[#555]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
