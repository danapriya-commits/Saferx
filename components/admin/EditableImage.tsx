'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { useContent } from './ContentProvider'

interface EditableImageProps extends Omit<ImageProps, 'src'> {
  section: string
  fieldKey: string
  defaultSrc: string
  asImg?: boolean
}

export function EditableImage({ section, fieldKey, defaultSrc, className, asImg, ...props }: EditableImageProps) {
  const { content, isEditing, updateContent } = useContent()
  const [isUploading, setIsUploading] = useState(false)
  const inputContainerRef = React.useRef<HTMLDivElement>(null)

  // Stop native event bubbling so React's synthetic event system (and Next.js <Link>) never sees the click.
  // This prevents the parent <Link> from calling preventDefault() which cancels the file dialog.
  React.useEffect(() => {
    const el = inputContainerRef.current
    if (!el) return
    const stopPropagation = (e: MouseEvent) => e.stopPropagation()
    el.addEventListener('click', stopPropagation)
    return () => el.removeEventListener('click', stopPropagation)
  }, [])

  const currentSrc = content[section]?.[fieldKey] ?? defaultSrc

  if (!isEditing) {
    if (asImg) {
      return <img src={currentSrc} className={className} {...(props as any)} />
    }
    return <Image src={currentSrc} className={className} {...props} />
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/editor/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        const newUrl = data.url 
        updateContent(section, fieldKey, newUrl, 'image')
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error(error)
      alert('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  const overlay = (
    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm pointer-events-none">
      <div ref={inputContainerRef} className="relative pointer-events-auto">
        <div className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2 transition-colors">
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            'Update Image'
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          title="Update Image"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />
      </div>
    </div>
  )

  const imageClasses = `${className || ''} transition-opacity ${isUploading ? 'opacity-50' : ''}`

  if (asImg) {
    return (
      <div className={`relative group inline-block overflow-hidden ${className || ''}`}>
        <img src={currentSrc} className={imageClasses} {...(props as any)} />
        {overlay}
      </div>
    )
  }

  const isFill = props.fill

  return (
    <div className={`group overflow-hidden ${isFill ? 'absolute inset-0' : 'relative inline-block'} ${className || ''}`}>
      <Image src={currentSrc} className={imageClasses} {...props} />
      {overlay}
    </div>
  )
}
