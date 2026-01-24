import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ChevronRight } from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Sample blog data
const blogPosts = [
  {
    id: '1',
    title: 'The Ultimate Guide to Sustainable Fashion',
    slug: 'ultimate-guide-sustainable-fashion',
    excerpt: 'Learn how to build a sustainable wardrobe that looks great and helps the environment.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    author: { name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    category: 'Fashion',
    publishedAt: '2024-01-20T00:00:00Z',
    readTime: 8,
  },
  {
    id: '2',
    title: '10 Must-Have Items for Your Capsule Wardrobe',
    slug: '10-must-have-capsule-wardrobe',
    excerpt: 'Discover the essential pieces that will form the foundation of your versatile wardrobe.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    author: { name: 'Emily Chen', avatar: 'https://i.pravatar.cc/150?img=5' },
    category: 'Style Tips',
    publishedAt: '2024-01-18T00:00:00Z',
    readTime: 6,
  },
  {
    id: '3',
    title: 'How to Style Your Home for Maximum Comfort',
    slug: 'style-home-maximum-comfort',
    excerpt: 'Transform your living space into a cozy sanctuary with these simple styling tips.',
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80',
    author: { name: 'Michael Brown', avatar: 'https://i.pravatar.cc/150?img=12' },
    category: 'Home & Living',
    publishedAt: '2024-01-15T00:00:00Z',
    readTime: 7,
  },
  {
    id: '4',
    title: 'Tech Gadgets That Will Change Your Life',
    slug: 'tech-gadgets-change-your-life',
    excerpt: 'Explore the latest innovative gadgets that combine style with functionality.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
    author: { name: 'David Lee', avatar: 'https://i.pravatar.cc/150?img=8' },
    category: 'Technology',
    publishedAt: '2024-01-12T00:00:00Z',
    readTime: 5,
  },
  {
    id: '5',
    title: 'Spring Summer 2024: Trending Colors and Patterns',
    slug: 'spring-summer-2024-trends',
    excerpt: 'Get ahead of the curve with our guide to the hottest fashion trends this season.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    author: { name: 'Jessica White', avatar: 'https://i.pravatar.cc/150?img=9' },
    category: 'Fashion',
    publishedAt: '2024-01-10T00:00:00Z',
    readTime: 9,
  },
  {
    id: '6',
    title: 'The Art of Mindful Shopping',
    slug: 'art-of-mindful-shopping',
    excerpt: 'Make better purchasing decisions and build a collection you truly love.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    author: { name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=13' },
    category: 'Lifestyle',
    publishedAt: '2024-01-08T00:00:00Z',
    readTime: 6,
  },
]

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
                  <span>•</span>
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
