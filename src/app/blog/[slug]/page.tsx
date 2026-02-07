import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, Clock, ChevronRight, ArrowLeft } from 'lucide-react'
import { blogPosts, getBlogPostBySlug } from '@/data/blog'
import { formatDate } from '@/lib/utils'

interface BlogDetailPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  // If not enough related posts in same category, fill with others
  const otherPosts = relatedPosts.length < 2
    ? blogPosts.filter((p) => p.id !== post.id && !relatedPosts.find((r) => r.id === p.id)).slice(0, 2 - relatedPosts.length)
    : []
  const displayRelated = [...relatedPosts, ...otherPosts]

  // Render markdown-like content
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let key = 0

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) {
        elements.push(<div key={key++} className="h-4" />)
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-[22px] sm:text-[26px] font-bold text-[#000] mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        )
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        elements.push(
          <p key={key++} className="text-[16px] font-semibold text-[#000] mt-4 mb-2">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        )
      } else if (trimmed.startsWith('- ')) {
        elements.push(
          <li key={key++} className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed ml-4 mb-1 list-disc">
            {trimmed.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
          </li>
        )
      } else {
        elements.push(
          <p key={key++} className="text-[15px] sm:text-[16px] text-[#555] leading-relaxed mb-3">
            {trimmed}
          </p>
        )
      }
    }

    return elements
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Header */}
      <div className="bg-[#f6f6f6]">
        <div className="container mx-auto px-4 py-12 sm:py-16 text-center">
          <h1 className="text-[24px] sm:text-[36px] font-bold text-[#000] mb-4 max-w-3xl mx-auto leading-tight">
            {post.title}
          </h1>
          <nav className="flex items-center justify-center gap-2 text-[14px]">
            <Link href="/" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <Link href="/blog" className="text-[#555] hover:text-[#a749ff] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-[#555]" />
            <span className="text-[#a749ff]">{post.category}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden mb-8 sm:mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-6 border-b border-[#ebebeb]">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[14px] font-medium text-[#000]">{post.author.name}</p>
                <p className="text-[12px] text-[#555]">Author</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#555]">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#555]">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
            <span className="px-3 py-1 bg-[#a749ff] text-white text-[12px] font-medium uppercase tracking-wide">
              {post.category}
            </span>
          </div>

          {/* Post Content */}
          <article className="mb-10 sm:mb-14">
            {renderContent(post.content)}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-8 border-b border-[#ebebeb]">
            <span className="text-[14px] font-medium text-[#000] mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-[#f6f6f6] text-[13px] text-[#555] hover:bg-[#a749ff] hover:text-white transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Related Posts */}
          {displayRelated.length > 0 && (
            <div className="mb-10">
              <h3 className="text-[24px] sm:text-[28px] font-bold text-[#000] mb-8">
                Related Posts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {displayRelated.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#f6f6f6] mb-4">
                      <Image
                        src={related.image}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="inline-block text-[12px] text-[#a749ff] uppercase tracking-wide mb-2">
                      {related.category}
                    </span>
                    <h4 className="text-[18px] font-semibold text-[#000] group-hover:text-[#a749ff] transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[13px] text-[#555]">
                      <span>{formatDate(related.publishedAt)}</span>
                      <span>&bull;</span>
                      <span>{related.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="text-center pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#000] hover:text-[#a749ff] transition-colors uppercase tracking-wide"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
