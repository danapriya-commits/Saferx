'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { BLOG_POSTS } from '@/lib/site-data'

export function BlogPreview() {
  return (
    <section className="container-px mx-auto max-w-[1536px] py-20 lg:py-28">
      <SectionHeading
        eyebrow="Knowledge Center"
        title="Insights from our biomedical experts"
        description="Guidance on healthcare technology, hospital planning and equipment care."
        cta={{ label: 'Visit the blog', href: '/knowledge-center' }}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/knowledge-center/${post.slug}`} className="flex flex-1 flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2.5 py-1 font-semibold text-primary">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
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
      </div>
    </section>
  )
}
