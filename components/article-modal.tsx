'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CalendarDays, Clock, User, CheckCircle2 } from 'lucide-react'
import { Article } from '@/lib/knowledge-data'
import { EditableImage } from '@/components/admin/EditableImage'

interface ArticleModalProps {
  article: Article
  onClose: () => void
}

function renderContent(content: string) {
  const paragraphs = content.trim().split('\n\n')
  
  return paragraphs.map((block, i) => {
    if (block.startsWith('### ')) {
      return (
        <h3 key={i} className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">
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
            return <p key={`p-${j}`} className="text-base leading-relaxed text-foreground/80 mb-2">{parsedLine}</p>
          })}
          {listItems.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 mt-3 text-foreground/80 marker:text-primary">
              {listItems.map((item, j) => {
                let parsedItem: React.ReactNode = item.replace('* ', '')
                if (typeof parsedItem === 'string' && parsedItem.includes('**')) {
                  const parts = parsedItem.split('**')
                  parsedItem = parts.map((part, k) => 
                    k % 2 === 1 ? <strong key={k} className="font-bold text-foreground">{part}</strong> : part
                  )
                }
                return (
                  <li key={`li-${j}`} className="pl-2 leading-relaxed text-base">
                    {parsedItem}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )
    }

    let parsedBlock: React.ReactNode = block
    if (block.includes('**')) {
      const parts = block.split('**')
      parsedBlock = parts.map((part, k) => 
        k % 2 === 1 ? <strong key={k} className="font-bold text-foreground">{part}</strong> : part
      )
    }

    return (
      <p key={i} className="text-base leading-relaxed text-foreground/80 mb-6">
        {parsedBlock}
      </p>
    )
  })
}

export function ArticleModal({ article, onClose }: ArticleModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 min-h-0 flex-col overflow-y-auto">
          <div className="relative h-64 sm:h-80 w-full shrink-0">
            <EditableImage 
              section="knowledge"
              fieldKey={`image_${article.slug}`}
              defaultSrc={article.image} 
              alt={article.title} 
              fill
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground mb-3 shadow-sm">
                {article.category}
              </span>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4 leading-snug">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80">
                <div className="flex items-center gap-1.5"><User className="h-4 w-4" /> {article.author}</div>
                <div className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {article.readTime}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="mb-8 rounded-2xl bg-secondary/30 p-6 border border-border/50">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Takeaways
                </h3>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="prose prose-base dark:prose-invert max-w-none">
              {renderContent(article.content)}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
