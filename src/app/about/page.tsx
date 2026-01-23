import Image from 'next/image'
import { Award, Heart, Truck, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              About Sellora
            </h1>
            <p className="text-xl text-neutral-300 leading-relaxed">
              We're passionate about bringing you premium quality products that enhance your lifestyle. Our mission is to make online shopping a delightful experience.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  Founded in 2020, Sellora began with a simple idea: to create an online shopping destination that combines quality, style, and convenience. What started as a small operation has grown into a trusted brand serving thousands of customers worldwide.
                </p>
                <p>
                  We carefully curate every product in our collection, working directly with manufacturers and artisans to ensure the highest standards. Our team is dedicated to discovering unique items that bring value and joy to your everyday life.
                </p>
                <p>
                  Today, Sellora stands as a testament to our commitment to excellence. We're not just selling products; we're building relationships and creating experiences that our customers love and trust.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-large">
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
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Sellora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Quality First
              </h3>
              <p className="text-neutral-600">
                We never compromise on quality. Every product is carefully selected and tested.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Customer Love
              </h3>
              <p className="text-neutral-600">
                Your satisfaction is our priority. We're here to help every step of the way.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-neutral-600">
                Quick and reliable shipping to get your orders to you as soon as possible.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Community
              </h3>
              <p className="text-neutral-600">
                Building a community of satisfied customers who trust and recommend us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-neutral-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-neutral-400">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-neutral-400">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8</div>
              <div className="text-neutral-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              The passionate people behind Sellora
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/400?img=1' },
              { name: 'Michael Chen', role: 'Head of Operations', image: 'https://i.pravatar.cc/400?img=12' },
              { name: 'Emily Brown', role: 'Creative Director', image: 'https://i.pravatar.cc/400?img=5' },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-neutral-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
