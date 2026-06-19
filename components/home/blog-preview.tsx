'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { useState, useEffect } from 'react'
import { EditableImage } from '@/components/admin/EditableImage'
import { BLOG_POSTS } from '@/lib/site-data'

export function BlogPreview() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/public/knowledge')
        if (res.ok) {
          const data = await res.json()
          if (data.articles && data.articles.length > 0) {
            setPosts(data.articles.slice(0, 3))
          } else {
            setPosts(BLOG_POSTS.map(p => ({ ...p, image_url: p.image })))
          }
        } else {
          setPosts(BLOG_POSTS.map(p => ({ ...p, image_url: p.image })))
        }
      } catch (e) {
        console.error("Failed to fetch blog posts", e)
        setPosts(BLOG_POSTS.map(p => ({ ...p, image_url: p.image })))
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section className="container-px mx-auto max-w-[1536px] py-14 lg:py-20">
      <SectionHeading
        eyebrow="Knowledge Center"
        title="Insights from our biomedical experts"
        description="Guidance on healthcare technology, hospital planning and equipment care."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative aspect-[16/10] bg-secondary skeleton" />
              <div className="flex flex-1 flex-col p-6 space-y-4">
                <div className="flex gap-2"><div className="h-5 w-20 bg-secondary rounded-full skeleton" /><div className="h-5 w-12 bg-secondary rounded-full skeleton" /></div>
                <div className="h-6 w-full bg-secondary rounded-md skeleton" />
                <div className="h-6 w-2/3 bg-secondary rounded-md skeleton" />
                <div className="h-4 w-full bg-secondary rounded-md skeleton mt-2" />
                <div className="h-4 w-full bg-secondary rounded-md skeleton" />
              </div>
            </div>
          ))
        ) : posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href="/knowledge-centre" className="flex flex-1 flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                {post.image_url ? (
                  <EditableImage
                    section="blog"
                    fieldKey={`image_${post.slug}`}
                    defaultSrc={post.image_url}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    5 min
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
        {posts.length === 0 && (
          <div className="col-span-3 text-center text-muted-foreground py-10">
            No articles published yet.
          </div>
        )}
      </div>
    </section>
  )
}
