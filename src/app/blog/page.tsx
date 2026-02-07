import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ChevronRight } from 'lucide-react'
import { blogPosts } from '@/data/blog'
import { formatDate } from '@/lib/utils'

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const recentPosts = blogPosts.slice(1)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-16 sm:py-20 text-center">
          <h1 className="text-[32px] sm:text-[40px] font-bold text-[#000] mb-4">Our Blog</h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">Blog</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        {/* Featured Post */}
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block mb-12 sm:mb-16 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 border border-[#ebebeb] overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 bg-[#a749ff] text-white text-[12px] font-medium uppercase tracking-wide mb-4 w-fit">
                Featured
              </span>
              <h2 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold text-[#000] mb-4 group-hover:text-[#a749ff] transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-[15px] text-[#555] mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 sm:gap-6 text-[13px] text-[#555] mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(featuredPost.publishedAt)}
                </div>
                <span>{featuredPost.readTime} min read</span>
              </div>
              <span className="text-[13px] font-medium text-[#000] uppercase tracking-wide relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#000] group-hover:text-[#a749ff] group-hover:after:bg-[#a749ff] transition-colors inline-block w-fit">
                Read More
              </span>
            </div>
          </div>
        </Link>

        {/* Recent Posts Section */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-[28px] sm:text-[32px] font-bold text-[#000]">
            Recent Posts
          </h2>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f6f6f6] mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="inline-block text-[12px] text-[#a749ff] uppercase tracking-wide mb-2">
                  {post.category}
                </span>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#000] mb-3 group-hover:text-[#a749ff] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[14px] text-[#555] mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-[#555]">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>&bull;</span>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
