import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowRight } from 'lucide-react'
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
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-3">
            Blog
          </h1>
          <p className="text-lg text-neutral-600">
            Stories, style tips, and inspiration for modern living
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block mb-16 group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all">
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-4 w-fit">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4 group-hover:text-primary-500 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-neutral-600 mb-6 text-lg">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-neutral-500 mb-6">
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
              <span className="inline-flex items-center gap-2 text-primary-500 font-medium group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Recent Posts Grid */}
        <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-8">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-neutral-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
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
