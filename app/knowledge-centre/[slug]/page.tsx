import { notFound } from 'next/navigation'
import { ARTICLES } from '@/lib/knowledge-data'
import { PageHero } from '@/components/section'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock, User } from 'lucide-react'
import React from 'react'
import { EditableImage } from '@/components/admin/EditableImage'

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }))
}

// Very basic markdown parser for the specific formatting in the articles
function renderContent(content: string) {
  const paragraphs = content.trim().split('\n\n')
  
  return paragraphs.map((block, i) => {
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">
          {block.replace('### ', '')}
        </h3>
      )
    }
    
    // Handle bullet points
    if (block.includes('* ')) {
      const items = block.split('\n').filter(line => line.trim().startsWith('* '))
      return (
        <ul key={i} className="list-disc pl-5 space-y-2 my-4 text-foreground/90">
          {items.map((item, j) => (
            <li key={j}>{item.replace('* ', '')}</li>
          ))}
        </ul>
      )
    }

    // Handle bold text parsing
    let parsedBlock: React.ReactNode = block
    if (block.includes('**')) {
      const parts = block.split('**')
      parsedBlock = parts.map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="font-bold text-foreground">{part}</strong> : part
      )
    }

    return (
      <p key={i} className="text-lg leading-relaxed text-foreground/80 mb-6">
        {parsedBlock}
      </p>
    )
  })
}

export default function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Custom Hero for Articles to accommodate the title and metadata nicely */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/40 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <EditableImage 
            asImg
            section="knowledge"
            fieldKey={`image_${article.slug}`}
            defaultSrc={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
          />
        </div>
        <div className="mx-auto max-w-4xl container-px relative z-10 text-center">
          <Link href="/knowledge-centre" className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Centre
          </Link>
          
          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-8">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-3xl container-px">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(article.content)}
          </div>
          
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Related Articles</h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2).map((other) => (
                <Link
                  key={other.slug}
                  href={`/knowledge-centre/${other.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <p className="text-xs font-medium text-muted-foreground mb-2">{other.date}</p>
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {other.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
