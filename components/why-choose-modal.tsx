'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export interface WhyChooseData {
  id: string
  title: string
  desc: string
  content?: string
}

interface WhyChooseModalProps {
  data: WhyChooseData
  onClose: () => void
}

export function WhyChooseModal({ data, onClose }: WhyChooseModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!mounted) return null

  // Format content for simple markdown-like rendering
  const renderContent = (contentString: string) => {
    return contentString.split('\n').map((paragraph, idx) => {
      if (!paragraph.trim()) return <br key={idx} />
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold font-heading text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
      }
      if (paragraph.startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 mb-2 ml-4">
            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-muted-foreground leading-relaxed">{paragraph.replace('* ', '')}</p>
          </div>
        )
      }
      return <p key={idx} className="mb-4 text-muted-foreground leading-relaxed">{paragraph}</p>
    })
  }

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, type: "spring", bounce: 0 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl bg-background shadow-2xl border border-border"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-sm px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">Why Partner With Us</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8">
            <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
              {data.title}
            </h1>
            <p className="text-lg font-medium text-foreground/80 mb-8 pb-8 border-b border-border/50 leading-relaxed">
              {data.desc}
            </p>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {data.content ? (
                renderContent(data.content)
              ) : (
                <p className="text-muted-foreground leading-relaxed">
                  More detailed information about this expertise area is currently being updated.
                  {data.desc}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  )
}
