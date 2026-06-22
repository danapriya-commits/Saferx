'use client'

import React, { useRef } from 'react'
import { useContent } from './ContentProvider'
import { Eye, EyeOff } from 'lucide-react'

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
  const textContent = content[section]?.[fieldKey] ?? children
  // Visibility is true by default, unless explicitly set to 'false'
  const isVisible = content[section]?.[`${fieldKey}_visible`] !== 'false'

  if (!isEditing) {
    if (!isVisible) return null;
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

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateContent(section, `${fieldKey}_visible`, isVisible ? 'false' : 'true', 'visibility')
  }

  return (
    <span className={`relative group inline-block w-full ${!isVisible ? 'opacity-40 grayscale' : ''}`}>
      <Component
        ref={textRef}
        className={`relative cursor-text hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-dashed transition-all outline-offset-4 focus:outline-blue-600 focus:bg-blue-50/10 focus:outline-solid block w-full ${className}`}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        title="Click to edit text"
      >
        {textContent}
      </Component>
      
      {/* Eye Icon Toggle */}
      <span 
        role="button"
        tabIndex={0}
        onClick={toggleVisibility}
        className="absolute -top-3 -right-3 z-50 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-90 hover:scale-100 cursor-pointer flex items-center justify-center"
        title={isVisible ? "Hide on live website" : "Show on live website"}
      >
        {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
      </span>
    </span>
  )
}
