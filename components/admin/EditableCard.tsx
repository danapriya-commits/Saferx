'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useContent } from './ContentProvider'
import { EditableCardModal, CardField } from './EditableCardModal'
import { Trash2, AlertTriangle, Eye, EyeOff } from 'lucide-react'

interface EditableCardProps {
  section: string
  cardId: string
  fields: CardField[]
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  allowDelete?: boolean
  [key: string]: any
}

export function EditableCard({
  section,
  cardId,
  fields,
  children,
  className = '',
  as: Component = 'div',
  allowDelete = false,
  ...props
}: EditableCardProps) {
  const { isEditing, content, updateContent } = useContent()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDeleted = content[section]?.[`${cardId}_deleted`] === "true"
  const isVisible = content[section]?.[`${cardId}_visible`] !== 'false'

  if (isDeleted) return null

  if (!isEditing) {
    if (!isVisible) return null;
    return <Component className={className} {...props}>{children}</Component>
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(true)
  }

  const confirmDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateContent(section, `${cardId}_deleted`, "true", "text")
    setShowConfirm(false)
  }

  const cancelDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowConfirm(false)
  }

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateContent(section, `${cardId}_visible`, isVisible ? 'false' : 'true', 'visibility')
  }

  return (
    <>
      <Component
        className={`relative group/editable cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-dashed outline-offset-4 focus:outline-blue-600 focus:bg-blue-50/10 focus:outline-solid transition-all ${!isVisible ? 'opacity-40 grayscale' : ''} ${className}`}
        onClick={handleClick}
        title="Click to edit card"
        {...props}
      >
        {children}

        <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 opacity-0 group-hover/editable:opacity-100 transition-opacity pointer-events-auto">
          {/* Eye Icon Toggle */}
          <div
            role="button"
            tabIndex={0}
            onClick={toggleVisibility}
            className="flex items-center justify-center rounded-full bg-slate-800 p-2 text-white shadow-sm hover:bg-slate-700 transition-colors"
            title={isVisible ? "Hide card on live website" : "Show card on live website"}
          >
            {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
          </div>

          {allowDelete && (
            <div
              role="button"
              tabIndex={0}
              onClick={handleDelete}
              className="flex items-center justify-center rounded-full bg-red-100 p-2 text-red-600 shadow-sm hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
              title="Delete Card"
            >
              <Trash2 className="h-4 w-4" />
            </div>
          )}
        </div>
      </Component>

      {isModalOpen && (
        <EditableCardModal
          section={section}
          cardId={cardId}
          fields={fields}
          allowDelete={allowDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {mounted && showConfirm && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-xl border border-border p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete Card</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6 ml-14">
              Are you sure you want to delete this card? It will be hidden from the live site.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
