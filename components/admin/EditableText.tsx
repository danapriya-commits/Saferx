'use client'

import React, { useRef, useEffect } from 'react'
import { useContent } from './ContentProvider'

interface EditableTextProps {
  section: string
  fieldKey: string
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  multiline?: boolean
}

export function EditableText({
  section,
  fieldKey,
  children,
  as: Component = 'span',
  className = '',
  multiline = false,
}: EditableTextProps) {
  const { content, isEditing, updateContent } = useContent()
  const textRef = useRef<HTMLElement>(null)
  
  // Get text from content context, fallback to children
  // Note: If children is complex ReactNode, extracting string is tricky, so we only support text children natively
  const textContent = content[section]?.[fieldKey] ?? children

  if (!isEditing) {
    return <Component className={className}>{textContent}</Component>
  }

  const handleBlur = () => {
    if (textRef.current) {
      const newText = textRef.current.innerText || textRef.current.textContent || ''
      if (newText !== textContent?.toString()) {
        updateContent(section, fieldKey, newText)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  return (
    <Component
      ref={textRef}
      className={`relative cursor-text hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-dashed transition-all outline-offset-4 focus:outline-blue-600 focus:bg-blue-50/10 focus:outline-solid ${className}`}
      contentEditable={true}
      suppressContentEditableWarning={true}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      title="Click to edit text"
    >
      {textContent}
    </Component>
  )
}
