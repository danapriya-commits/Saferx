'use client'

import React, { useState, useRef, useEffect } from 'react'
import { X, UploadCloud } from 'lucide-react'
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
  onClose: () => void
}

export function EditableCardModal({ section, cardId, fields, onClose }: EditableCardModalProps) {
  const { content, updateContent } = useContent()
  const [initialData, setInitialData] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isUploading, setIsUploading] = useState<Record<string, boolean>>({})
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Prevent body scroll when modal is open
  useEffect(() => {
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

  const handleSave = () => {
    fields.forEach(f => {
      const fieldKey = `${cardId}_${f.key}`
      updateContent(section, fieldKey, formData[f.key], f.type === 'image' ? 'image' : 'text')
    })
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseRequest} />
        
        <div className="relative w-full max-w-2xl max-h-full overflow-hidden flex flex-col rounded-2xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-xl font-semibold text-foreground">Edit Card Content</h2>
            <button
              onClick={handleCloseRequest}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Form Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {fields.map(f => (
              <div key={f.key} className="space-y-2">
                <label className="text-sm font-medium text-foreground">{f.label}</label>
                
                {f.type === 'text' && (
                  <input
                    type="text"
                    value={formData[f.key] || ''}
                    onChange={e => handleTextChange(f.key, e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                )}

                {f.type === 'textarea' && (
                  <textarea
                    value={formData[f.key] || ''}
                    onChange={e => handleTextChange(f.key, e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                )}

                {f.type === 'image' && (
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border bg-muted">
                      {formData[f.key] ? (
                        <Image src={formData[f.key]} alt={f.label} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                          No image selected
                        </div>
                      )}
                      {isUploading[f.key] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
                      className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Upload New Image
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4 flex justify-end gap-3 bg-muted/20">
            <button
              onClick={handleCloseRequest}
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            >
              Save Changes
            </button>
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
    </>
  )
}
