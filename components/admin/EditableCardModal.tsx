'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, UploadCloud, Trash2 } from 'lucide-react'
import { useContent } from './ContentProvider'
import Image from 'next/image'

export interface CardField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image'
  defaultValue: string
}

interface EditableCardModalProps {
  section: string
  cardId: string
  fields: CardField[]
  allowDelete?: boolean
  onClose: () => void
}

export function EditableCardModal({ section, cardId, fields, allowDelete, onClose }: EditableCardModalProps) {
  const { content, updateContent } = useContent()
  const [initialData, setInitialData] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const [mounted, setMounted] = useState(false)

  // Prevent body scroll when modal is open
  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Initialize form data from content context
  useEffect(() => {
    const data: Record<string, string> = {}
    fields.forEach(f => {
      const fieldKey = `${cardId}_${f.key}`
      data[f.key] = content[section]?.[fieldKey] ?? f.defaultValue
    })
    setFormData(data)
    setInitialData(data)
  }, [content, section, cardId, fields])

  const [showConfirm, setShowConfirm] = useState(false)

  const handleCloseRequest = () => {
    const hasChanges = fields.some(f => formData[f.key] !== initialData[f.key])
    if (hasChanges) {
      setShowConfirm(true)
    } else {
      onClose()
    }
  }

  const handleTextChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleImageUpload = async (key: string, file: File) => {
    setIsUploading(prev => ({ ...prev, [key]: true }))
    try {
      const data = new FormData()
      data.append('file', file)
      
      const response = await fetch('/api/editor/upload', {
        method: 'POST',
        body: data,
      })

      if (response.ok) {
        const json = await response.json()
        setFormData(prev => ({ ...prev, [key]: json.url }))
      } else {
        alert('Image upload failed')
      }
    } catch (error) {
      console.error(error)
      alert('Error uploading image')
    } finally {
      setIsUploading(prev => ({ ...prev, [key]: false }))
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this card? It will be hidden from the live site.')) {
      updateContent(section, `${cardId}_deleted`, "true", "text")
      onClose()
    }
  }

  const handleSave = () => {
    fields.forEach(f => {
      const fieldKey = `${cardId}_${f.key}`
      updateContent(section, fieldKey, formData[f.key], f.type === 'image' ? 'image' : 'text')
    })
    onClose()
  }

  if (!mounted) return null

  return createPortal(
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseRequest} />
        
        <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-border">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5 bg-muted/20">
            <div>
              <h2 className="text-xl font-bold text-foreground">Edit Content</h2>
              <p className="text-sm text-muted-foreground mt-1">Update the details for this card below.</p>
            </div>
            <button
              onClick={handleCloseRequest}
              className="rounded-full p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
            {fields.map(f => (
              <div key={f.key} className="space-y-2.5">
                <label className="text-sm font-semibold text-foreground uppercase tracking-wide">{f.label}</label>
                
                {f.type === 'text' && (
                  <input
                    type="text"
                    value={formData[f.key] || ''}
                    onChange={e => handleTextChange(f.key, e.target.value)}
                    className="w-full rounded-xl border-2 border-muted bg-background px-4 py-3 text-base transition-colors hover:border-muted-foreground/30 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                  />
                )}

                {f.type === 'textarea' && (
                  <textarea
                    value={formData[f.key] || ''}
                    onChange={e => handleTextChange(f.key, e.target.value)}
                    rows={4}
                    className="w-full rounded-xl border-2 border-muted bg-background px-4 py-3 text-base transition-colors hover:border-muted-foreground/30 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 resize-y"
                  />
                )}

                {f.type === 'image' && (
                  <div className="space-y-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-dashed border-muted bg-muted/20 transition-colors hover:border-muted-foreground/50">
                      {formData[f.key] ? (
                        <Image src={formData[f.key]} alt={f.label} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-muted-foreground gap-2">
                          <UploadCloud className="h-8 w-8 opacity-50" />
                          <span className="text-sm font-medium">No image selected</span>
                        </div>
                      )}
                      {isUploading[f.key] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={el => {
                        if (el) fileInputRefs.current[f.key] = el
                      }}
                      onChange={e => {
                        if (e.target.files?.[0]) handleImageUpload(f.key, e.target.files[0])
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[f.key]?.click()}
                      disabled={isUploading[f.key]}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-muted bg-background px-6 py-2.5 text-sm font-semibold hover:bg-muted hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      <UploadCloud className="h-4 w-4" />
                      {formData[f.key] ? 'Change Image' : 'Upload Image'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-5 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 bg-muted/20">
            <div>
              {allowDelete && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Card
                </button>
              )}
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={handleCloseRequest}
                className="w-full sm:w-auto rounded-xl px-6 py-2.5 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="w-full sm:w-auto rounded-xl bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowConfirm(false)} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl bg-background shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-2">Discard Changes?</h3>
              <p className="text-sm text-muted-foreground">
                You have unsaved changes. Are you sure you want to discard them?
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-border bg-muted/20 px-6 py-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
              >
                Keep Editing
              </button>
              <button
                onClick={onClose}
                className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}
