import { notFound } from 'next/navigation'
import { ARTICLES } from '@/lib/knowledge-data'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Clock, User, CheckCircle2, ChevronRight } from 'lucide-react'
import React from 'react'
import { EditableImage } from '@/components/admin/EditableImage'
import { supabase } from '@/lib/supabase'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
        <h3 key={i} className="font-heading text-2xl font-bold text-foreground mt-12 mb-6">
          {block.replace('### ', '')}
        </h3>
      )
    }
    
    // Handle bullet points
    if (block.includes('* ')) {
      const lines = block.split('\n')
      const nonListLines = lines.filter(line => !line.trim().startsWith('* ') && line.trim().length > 0)
      const listItems = lines.filter(line => line.trim().startsWith('* '))

      return (
        <div key={i} className="mb-6">
          {nonListLines.map((line, j) => {
            let parsedLine: React.ReactNode = line
            if (line.includes('**')) {
              const parts = line.split('**')
              parsedLine = parts.map((part, k) => 
                k % 2 === 1 ? <strong key={k} className="font-bold text-foreground">{part}</strong> : part
              )
            }
            return <p key={`p-${j}`} className="text-lg leading-relaxed text-foreground/80 mb-2">{parsedLine}</p>
          })}
          {listItems.length > 0 && (
            <ul className="list-disc pl-5 space-y-3 mt-4 text-foreground/80 marker:text-primary">
              {listItems.map((item, j) => {
                let parsedItem: React.ReactNode = item.replace('* ', '')
                if (typeof parsedItem === 'string' && parsedItem.includes('**')) {
                  const parts = parsedItem.split('**')
                  parsedItem = parts.map((part, k) => 
                    k % 2 === 1 ? <strong key={k} className="font-bold text-foreground">{part}</strong> : part
                  )
                }
                return (
                  <li key={`li-${j}`} className="pl-2 leading-relaxed">
                    {parsedItem}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
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

export default async function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let article = null;
  
  try {
    const { data, error } = await supabase
      .from('knowledge_centre')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (data && !error) {
      article = {
        title: data.title,
        slug: data.slug,
        category: data.category || 'Uncategorized',
        date: data.published_at || data.created_at,
        readTime: data.read_time || '5 min',
        author: data.author || 'Saferx Expert',
        image: data.image_url || '/images/project-hospital.png',
        excerpt: data.excerpt,
        content: data.content,
        keyTakeaways: data.key_takeaways || [],
      };
    }
  } catch (err) {
    console.error("Error fetching article from Supabase:", err);
  }

  if (!article) {
    article = ARTICLES.find((a) => a.slug === slug) as any;
  }

  if (!article) {
    notFound()
  }

  // Get related articles from the same category
  const relatedArticles = ARTICLES.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Custom Hero Banner */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/50 z-0">
          <EditableImage 
            section="knowledge"
            fieldKey={`image_${article.slug}`}
            defaultSrc={article.image} 
            alt={article.title} 
            fill
            sizes="100vw"
            className="object-cover opacity-40 mix-blend-overlay" 
          />
        </div>
        <div className="mx-auto max-w-4xl container-px relative z-10 text-center">
          <Link href="/knowledge-centre" className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Knowledge Center
          </Link>
          
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary-foreground/20 backdrop-blur-sm px-3 py-1 text-sm font-semibold text-white border border-white/20">
              {article.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-8 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-primary-foreground/90">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 opacity-80" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 opacity-80" />
              {new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 opacity-80" />
              {article.readTime}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-3xl container-px">
          
          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="mb-12 rounded-2xl bg-secondary/30 p-8 border border-border/50">
              <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {article.keyTakeaways.map((takeaway: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-foreground/80 leading-relaxed">
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(article.content)}
          </div>
          
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Related Articles</h3>
            {relatedArticles.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {relatedArticles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/knowledge-centre/${other.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
                  >
                    <div>
                      <span className="text-xs font-semibold text-primary mb-3 block">{other.category}</span>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4">
                        {other.title}
                      </h4>
                    </div>
                    <div className="flex items-center text-sm font-medium text-muted-foreground mt-4 pt-4 border-t border-border/50">
                      Read Article <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">More articles in this category coming soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-primary/5 py-20 border-t border-border">
        <div className="mx-auto max-w-4xl container-px text-center">
          <h2 className="text-3xl font-bold mb-6 font-heading text-foreground">Need Expert Guidance?</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
            Our healthcare technology specialists can help you evaluate equipment options, plan expansion projects, optimize equipment investments, and develop procurement strategies aligned with your clinical and operational goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className={cn(buttonVariants({ size: "lg" }), "font-semibold px-8 h-12")}
            >
              Contact Us
            </Link>
            <Link 
              href="/contact" 
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold px-8 h-12")}
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
