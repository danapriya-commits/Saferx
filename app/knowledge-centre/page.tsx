'use client'

import { Suspense } from 'react'

import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { PageHero } from '@/components/section'
import { ARTICLES, CATEGORIES } from '@/lib/knowledge-data'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { ArrowRight, Clock, CalendarDays, Search, Tag, FileText, Plus, X, Upload, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { EditableImage } from '@/components/admin/EditableImage'
import { EditableCard } from '@/components/admin/EditableCard'
import { useContent } from '@/components/admin/ContentProvider'
import { ArticleModal } from '@/components/article-modal'

export default function KnowledgeCentrePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnowledgeCentreContent />
    </Suspense>
  )
}

function KnowledgeCentreContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const articleParam = searchParams.get('article')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  // Add Article form state
  const [newTitle, setNewTitle] = useState('')
  const [newExcerpt, setNewExcerpt] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0])
  const [isUploading, setIsUploading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

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
  
  const customArticles = useMemo(() => {
    const slugs = customSlugsStr.split(',').filter(Boolean)
    return slugs.map(slug => ({
      slug: `custom_${slug}`,
      title: content['knowledge']?.[`custom_${slug}_title`] || 'New Custom Article',
      excerpt: content['knowledge']?.[`custom_${slug}_excerpt`] || 'Click to edit this custom article description.',
      date: content['knowledge']?.[`custom_${slug}_date`] || new Date().toISOString(),
      category: content['knowledge']?.[`custom_${slug}_category`] || 'Custom',
      readTime: '5 min read',
      image: content['knowledge']?.[`custom_${slug}_image`] || '',
      content: content['knowledge']?.[`custom_${slug}_content`] || '',
      isCustom: true
    }))
  }, [customSlugsStr, content])

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

  useEffect(() => {
    if (articleParam && mounted && filteredArticles.length > 0) {
      const found = filteredArticles.find(a => a.slug === articleParam)
      if (found) {
        setSelectedArticle(found)
      }
    }
  }, [articleParam, mounted, filteredArticles])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/editor/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setNewImageUrl(data.url)
      } else {
        alert('Failed to upload image. Please try again.')
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('An error occurred while uploading the image.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleCreateArticle = () => {
    if (!newTitle.trim()) {
      alert('Please enter a title for the article.')
      return
    }

    setIsCreating(true)

    const newSlug = Date.now().toString()
    const customSlugs = customSlugsStr.split(',').filter(Boolean)
    const newSlugsList = [...customSlugs, newSlug].join(',')

    // Save all fields to the content store
    updateContent('knowledge', 'custom_article_slugs', newSlugsList, 'text')
    updateContent('knowledge', `custom_${newSlug}_title`, newTitle.trim(), 'text')
    updateContent('knowledge', `custom_${newSlug}_excerpt`, newExcerpt.trim(), 'text')
    updateContent('knowledge', `custom_${newSlug}_category`, newCategory || 'Custom', 'text')
    updateContent('knowledge', `custom_${newSlug}_content`, newContent.trim(), 'text')
    updateContent('knowledge', `custom_${newSlug}_date`, newDate ? new Date(newDate).toISOString() : new Date().toISOString(), 'text')
    if (newImageUrl) {
      updateContent('knowledge', `custom_${newSlug}_image`, newImageUrl, 'image')
    }

    // Reset form
    setNewTitle('')
    setNewExcerpt('')
    setNewCategory('')
    setNewContent('')
    setNewImageUrl('')
    setNewDate(new Date().toISOString().split('T')[0])
    setIsCreating(false)
    setShowAddModal(false)
  }

  const resetAndCloseModal = () => {
    setNewTitle('')
    setNewExcerpt('')
    setNewCategory('')
    setNewContent('')
    setNewImageUrl('')
    setNewDate(new Date().toISOString().split('T')[0])
    setShowAddModal(false)
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
                  {filteredArticles.map((article, i) => {
                    const title = content['knowledge']?.[`${article.slug}_title`] || article.title
                    const excerpt = content['knowledge']?.[`${article.slug}_excerpt`] || article.excerpt
                    return (
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
                            {title}
                          </h3>
                          <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-3">
                            {excerpt}
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
                  )})}

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
                        onClick={() => setShowAddModal(true)}
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
          onClose={() => {
            setSelectedArticle(null)
            if (articleParam) {
              const newParams = new URLSearchParams(searchParams.toString())
              newParams.delete('article')
              router.replace(`${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`, { scroll: false })
            }
          }} 
        />
      )}

      {/* Add New Article Modal */}
      {mounted && showAddModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={resetAndCloseModal}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background shadow-2xl border border-border animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Plus className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Add New Article</h2>
                  <p className="text-sm text-muted-foreground">Fill in the details to create a new card</p>
                </div>
              </div>
              <button
                onClick={resetAndCloseModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Cover Image</label>
                <div className="relative">
                  {newImageUrl ? (
                    <div className="relative h-48 w-full rounded-xl overflow-hidden border border-border bg-secondary">
                      <img src={newImageUrl} alt="Preview" className="h-full w-full object-cover" />
                      <button
                        onClick={() => { setNewImageUrl(''); if (fileInputRef.current) fileInputRef.current.value = '' }}
                        className="absolute top-2 right-2 h-8 w-8 flex items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm hover:bg-muted transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-border bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                          <span className="text-sm text-muted-foreground">Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium text-foreground">Click to upload image</span>
                          <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP (max 5MB)</span>
                        </>
                      )}
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Title <span className="text-destructive">*</span></label>
                <Input
                  type="text"
                  placeholder="Enter article title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Date</label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="h-12 text-base w-full flex"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Custom">Custom</option>
                </select>
              </div>

              {/* Excerpt / Short Description */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Short Description</label>
                <textarea
                  placeholder="Brief description that appears on the card..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  rows={3}
                  className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Content</label>
                <textarea
                  placeholder="Write the full article content here. Use ### for headings and * for bullet points..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={8}
                  className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Tip: Use <code className="bg-muted px-1 py-0.5 rounded text-xs">### Heading</code> for section titles and <code className="bg-muted px-1 py-0.5 rounded text-xs">* Item</code> for bullet points.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-border bg-background/95 backdrop-blur-sm px-6 py-4 rounded-b-2xl">
              <Button
                variant="outline"
                onClick={resetAndCloseModal}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateArticle}
                disabled={isCreating || !newTitle.trim()}
                className="px-6 gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create Article
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
