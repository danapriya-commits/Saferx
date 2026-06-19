'use client'

import { useState, useMemo } from 'react'
import { PageHero } from '@/components/section'
import { ARTICLES, CATEGORIES } from '@/lib/knowledge-data'
import Link from 'next/link'
import { ArrowRight, Clock, CalendarDays, Search, Tag, FileText, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { EditableImage } from '@/components/admin/EditableImage'
import { EditableCard } from '@/components/admin/EditableCard'
import { useContent } from '@/components/admin/ContentProvider'
import { ArticleModal } from '@/components/article-modal'

export default function KnowledgeCentrePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)

  // Featured Articles: Procurement Guide, Technology Planning, Lifecycle Management, TCO
  const featuredSlugs = [
    'medical-equipment-procurement-guide',
    'technology-planning-hospital-expansion',
    'biomedical-equipment-lifecycle-management',
    'understanding-total-cost-of-ownership'
  ]
  const featuredArticles = ARTICLES.filter(a => featuredSlugs.includes(a.slug))

  const { content, isEditing, updateContent } = useContent()

  // Read custom article slugs from CMS
  const customSlugsStr = content['knowledge']?.['custom_article_slugs'] || ''
  const customSlugs = customSlugsStr.split(',').filter(Boolean)

  const customArticles = customSlugs.map(slug => ({
    slug: `custom_${slug}`,
    title: content['knowledge']?.[`custom_${slug}_title`] || 'New Custom Article',
    excerpt: content['knowledge']?.[`custom_${slug}_excerpt`] || 'Click to edit this custom article description.',
    date: new Date().toISOString(),
    category: 'Custom',
    readTime: '5 min read',
    image: '',
    isCustom: true
  }))

  // Filtered articles (combine static ARTICLES and customArticles)
  const filteredArticles = useMemo(() => {
    const allArticles = [...ARTICLES, ...customArticles]
    return allArticles.filter((article) => {
      const isDeleted = content['knowledge']?.[`${article.slug}_deleted`] === "true"
      if (isDeleted) return false

      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory ? article.category === activeCategory : true
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory, ARTICLES, customArticles, content, isEditing])

  const handleAddCustomArticle = () => {
    const newSlug = Date.now().toString()
    const newSlugsList = [...customSlugs, newSlug].join(',')
    updateContent('knowledge', 'custom_article_slugs', newSlugsList, 'text')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Knowledge Center"
        description="Expert insights, procurement guides, technology planning resources, equipment management strategies, and healthcare technology resources for hospitals, laboratories, diagnostic centres, and healthcare providers."
        breadcrumb="Knowledge Center"
        eyebrow="Resources & Insights"
        backgroundImage="/images/project-hospital.png"
      />

      {/* Search and Filter Section */}
      <section className="bg-secondary/30 py-6 border-b border-border">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search articles, guides, insights..."
                className="pl-10 h-12 bg-background border-border/50 text-base rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-auto flex flex-wrap gap-2">
              <Button
                variant={activeCategory === null ? 'default' : 'outline'}
                className="rounded-full"
                onClick={() => setActiveCategory(null)}
              >
                All Categories
              </Button>
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className="rounded-full"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-16 sm:pt-8 sm:pb-24 bg-background flex-1">
        <div className="mx-auto max-w-[1536px] container-px">
          
          {/* Featured Articles Section (Only show when not searching/filtering) */}
          {!searchQuery && !activeCategory && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-8 font-heading">Featured Articles</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredArticles.filter(a => content['knowledge']?.[`featured_article_${a.slug}_deleted`] !== "true").map((article, i) => {
                  const cardId = `featured_article_${article.slug}`
                  const title = content['knowledge']?.[`${cardId}_title`] || article.title
                  const excerpt = content['knowledge']?.[`${cardId}_excerpt`] || article.excerpt

                  return (
                    <EditableCard
                      key={article.slug}
                      section="knowledge"
                      cardId={cardId}
                      as="button"
                      onClick={() => setSelectedArticle(article)}
                      allowDelete={true}
                      fields={[
                        { key: 'title', label: 'Title', type: 'textarea', defaultValue: article.title },
                        { key: 'excerpt', label: 'Excerpt', type: 'textarea', defaultValue: article.excerpt }
                      ]}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col sm:flex-row h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/40"
                      >
                        <div className="relative h-64 sm:h-full sm:w-2/5 shrink-0 overflow-hidden bg-secondary">
                          <EditableImage
                            section="knowledge"
                            fieldKey={`image_${article.slug}`}
                            defaultSrc={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 640px) 100vw, 40vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-col p-6 sm:p-8 flex-1">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                              {article.category}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </h3>
                          <p className="text-muted-foreground text-sm sm:text-base mb-6 line-clamp-3">
                            {excerpt}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                              <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </EditableCard>
                  )
                })}
              </div>
            </div>
          )}

          {/* All Articles Grid */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8 font-heading">
              {searchQuery ? 'Search Results' : activeCategory ? `${activeCategory} Articles` : 'All Articles'}
            </h2>
            
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border-2 border-dashed border-border bg-secondary/10">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search query or category filter.</p>
                <Button onClick={() => { setSearchQuery(''); setActiveCategory(null) }} variant="outline" className="mt-6">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence>
                  {filteredArticles.map((article, i) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      key={article.slug}
                    >
                      <EditableCard
                        section="knowledge"
                        cardId={article.slug}
                        as="button"
                        onClick={() => setSelectedArticle(article)}
                        allowDelete={true}
                        fields={[
                          { key: 'title', label: 'Title', type: 'text', defaultValue: article.title },
                          { key: 'excerpt', label: 'Excerpt', type: 'textarea', defaultValue: article.excerpt }
                        ]}
                        className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/40"
                      >
                        <div className="relative h-48 shrink-0 overflow-hidden bg-secondary">
                          <EditableImage
                            section="knowledge"
                            fieldKey={`image_${article.slug}`}
                            defaultSrc={article.image}
                            alt={article.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center rounded-md bg-background/90 backdrop-blur px-2 py-1 text-xs font-semibold text-foreground shadow-sm">
                              {article.category}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-3">
                            {article.excerpt}
                          </p>
                          <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                              <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                            <span className="flex items-center text-xs font-semibold text-primary">
                              {('isCustom' in article) && article.isCustom && isEditing ? 'Edit Article' : 'Read More'} <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </EditableCard>
                    </motion.div>
                  ))}

                  {/* Add New Card Button (Admins Only) */}
                  {isEditing && !searchQuery && !activeCategory && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <button
                        onClick={handleAddCustomArticle}
                        className="group flex flex-col items-center justify-center h-full min-h-[360px] w-full overflow-hidden rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors"
                      >
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Plus className="h-8 w-8 text-primary" />
                        </div>
                        <span className="text-lg font-bold text-primary">Add New Article</span>
                        <span className="text-sm text-primary/70 mt-2">Click to create a custom card</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl container-px text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">Need Expert Guidance?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed max-w-3xl mx-auto">
            Our healthcare technology specialists can help you evaluate equipment options, plan expansion projects, optimize equipment investments, and develop procurement strategies aligned with your clinical and operational goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "font-semibold px-8")}
            >
              Contact Us
            </Link>
            <Link 
              href="/contact" 
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-semibold px-8 border-primary-foreground/30 hover:bg-primary-foreground/10 text-white bg-transparent")}
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>
  )
}
