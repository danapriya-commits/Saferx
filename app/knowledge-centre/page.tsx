'use client'

import { useState, useEffect } from 'react'
import { PageHero } from '@/components/section'
import { ARTICLES } from '@/lib/knowledge-data'
import Link from 'next/link'
import { ArrowRight, Clock, CalendarDays, Plus } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { EditableCard } from '@/components/admin/EditableCard'
import { EditableImage } from '@/components/admin/EditableImage'
import { useContent } from '@/components/admin/ContentProvider'

export default function KnowledgeCentrePage() {
  const { content, isEditing } = useContent()
  const [articlesList, setArticlesList] = useState<any[]>(ARTICLES)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/public/knowledge')
      if (res.ok) {
        const data = await res.json()
        if (data.articles && data.articles.length > 0) {
          setArticlesList(data.articles)
        }
      }
    } catch (error) {
      console.error("Failed to fetch articles", error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={<EditableText section="knowledge" fieldKey="hero_title">Knowledge Centre</EditableText>}
        description={<EditableText section="knowledge" fieldKey="hero_description">Insights, guides, and best practices for healthcare technology planning and equipment procurement.</EditableText>}
        breadcrumb="Knowledge Centre"
        eyebrow={<EditableText section="knowledge" fieldKey="hero_eyebrow">Resources</EditableText>}
        backgroundImage="/images/project-hospital.png"
        section="knowledge"
        fieldKey="hero_bg"
      />

      <section className="py-16 sm:py-24 bg-secondary/10 flex-1">
        <div className="mx-auto max-w-[1536px] container-px">
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articlesList.map((article, i) => {
              const cardId = `article_${article.id || i}`
              const title = content['knowledge']?.[`${cardId}_title`] || article.title
              const excerpt = content['knowledge']?.[`${cardId}_excerpt`] || article.excerpt
              const date = content['knowledge']?.[`${cardId}_date`] || article.date || 'Recently'
              const readTime = content['knowledge']?.[`${cardId}_readTime`] || article.readTime || '5 min read'
              const image = content['knowledge']?.[`${cardId}_image`] || article.image || article.image_url || '/images/placeholder.jpg'
              const btnText = content['knowledge']?.[`${cardId}_btn`] || 'Read Article'

              return (
                <div key={cardId} className="relative group/edit h-full">
                  <EditableCard
                    section="knowledge"
                    cardId={cardId}
                    as={Link}
                    // @ts-ignore
                    href={`/knowledge-centre/${article.slug}`} 
                    className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
                    fields={[
                      { key: 'image', label: 'Cover Image', type: 'image', defaultValue: image },
                      { key: 'title', label: 'Title', type: 'text', defaultValue: title },
                      { key: 'excerpt', label: 'Excerpt', type: 'textarea', defaultValue: excerpt },
                      { key: 'date', label: 'Date', type: 'text', defaultValue: date },
                      { key: 'readTime', label: 'Read Time', type: 'text', defaultValue: readTime },
                      { key: 'btn', label: 'Button Text', type: 'text', defaultValue: btnText }
                    ]}
                  >
                    <div className="relative h-56 shrink-0 overflow-hidden bg-secondary/20">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <EditableImage
                        asImg
                        section="knowledge"
                        fieldKey={`${cardId}_image`}
                        defaultSrc={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {date}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {readTime}
                        </div>
                      </div>

                      <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm flex-1 mb-6 line-clamp-3">
                        {excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                        {btnText}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </EditableCard>

                  {isEditing && article.id && (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        if (confirm('Are you sure you want to delete this article?')) {
                          try {
                            const res = await fetch(`/api/editor/knowledge/${article.id}`, { method: 'DELETE' });
                            if (res.ok) fetchArticles();
                            else alert('Failed to delete article');
                          } catch (e) {
                            console.error(e);
                          }
                        }
                      }}
                      className="absolute -top-3 -right-3 z-10 hidden group-hover/edit:flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors"
                      title="Delete Article"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  )}
                </div>
              )
            })}

            {isEditing && (
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="group flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 hover:-translate-y-1 min-h-[350px] cursor-pointer"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                  <Plus className="h-8 w-8" />
                </div>
                <span className="font-heading text-lg font-semibold text-foreground">Add New Article</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {isAddModalOpen && (
        <AddArticleModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false)
            fetchArticles()
          }}
        />
      )}
    </div>
  )
}

function AddArticleModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    image_url: ''
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    
    try {
      const res = await fetch('/api/editor/upload', {
        method: 'POST',
        body: fd
      })
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, image_url: data.url }))
      } else {
        alert('Failed to upload image')
      }
    } catch (err) {
      console.error(err)
      alert('Error uploading image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return alert('Title is required')
    
    // Generate slug from title if empty
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/editor/knowledge/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug })
      })
      
      if (res.ok) {
        onSuccess()
      } else {
        alert('Failed to add article')
      }
    } catch (err) {
      console.error(err)
      alert('Error adding article')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-heading text-xl font-bold">Add New Article</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-secondary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <form id="add-article-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              {formData.image_url ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({...prev, image_url: ''}))}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-lg hover:bg-black/70"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Article Title"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Excerpt</label>
              <textarea 
                rows={3}
                value={formData.excerpt}
                onChange={e => setFormData(prev => ({...prev, excerpt: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief summary of the article"
              />
            </div>
          </form>
        </div>
        
        <div className="border-t border-border p-6 flex justify-end gap-3 bg-secondary/20 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-article-form"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Saving...
              </>
            ) : 'Add Article'}
          </button>
        </div>
      </div>
    </div>
  )
}
