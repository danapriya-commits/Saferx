  'use client'

import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { useContent } from './ContentProvider'
import { Eye, EyeOff } from 'lucide-react'

interface EditableImageProps extends Omit<ImageProps, 'src'> {
  section: string
  fieldKey: string
  defaultSrc: string
  asImg?: boolean
  hideToggle?: boolean
}

export function EditableImage({ section, fieldKey, defaultSrc, className, asImg, hideToggle, priority, loading, ...props }: EditableImageProps) {
  const { content, isEditing, updateContent } = useContent()
  const [isUploading, setIsUploading] = useState(false)
  const inputContainerRef = React.useRef<HTMLDivElement>(null)
  const eyeIconRef = React.useRef<HTMLButtonElement>(null)

  // Stop native event bubbling so React's synthetic event system (and Next.js <Link>) never sees the click.
  // This prevents the parent <Link> from calling preventDefault() which cancels the file dialog.
  React.useEffect(() => {
    const el = inputContainerRef.current
    const stopPropagation = (e: MouseEvent) => {
      e.stopPropagation()
      // Note: do not preventDefault here, otherwise file input won't open.
    }
    
    if (el) el.addEventListener('click', stopPropagation)
    
    return () => {
      if (el) el.removeEventListener('click', stopPropagation)
    }
  }, [isEditing, hideToggle])

  const currentSrc = content[section]?.[fieldKey] || defaultSrc || '/images/placeholder.jpg'
  // Visibility is true by default, unless explicitly set to 'false'
  const isVisible = content[section]?.[`${fieldKey}_visible`] !== 'false'

  if (!isEditing) {
    if (!isVisible) return null;
    
    if (asImg) {
      return <img src={currentSrc} className={className} loading={priority ? "eager" : loading} {...(props as any)} />
    }
    return <Image src={currentSrc} className={className} priority={priority} loading={priority ? "eager" : loading} fetchPriority={priority ? "high" : undefined} {...props} />
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalFile = e.target.files?.[0]
    if (!originalFile) return

    setIsUploading(true)
    try {
      // Compress the image client-side to avoid Vercel 4.5MB payload limits
      const fileToUpload = await new Promise<File>((resolve) => {
        if (originalFile.type === 'image/svg+xml' || originalFile.type === 'image/gif' || originalFile.size < 1024 * 1024) {
          return resolve(originalFile);
        }
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          const MAX_SIZE = 1920;
          if (width > height && width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          } else if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(originalFile);
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], originalFile.name.replace(/\.[^/.]+$/, "") + ".webp", { type: 'image/webp' }));
            } else {
              resolve(originalFile);
            }
          }, 'image/webp', 0.85);
        };
        img.onerror = () => resolve(originalFile);
        img.src = URL.createObjectURL(originalFile);
      });

      const formData = new FormData()
      formData.append('file', fileToUpload)
      
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

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateContent(section, `${fieldKey}_visible`, isVisible ? 'false' : 'true', 'visibility')
  }

  const overlay = (
    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm pointer-events-none">
      
      {/* Eye Icon Toggle - Moved to top right */}
      {!hideToggle && (
        <button 
          ref={eyeIconRef}
          type="button"
          onClick={toggleVisibility}
          className="absolute top-3 right-3 pointer-events-auto p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full shadow-lg transition-all z-50 cursor-pointer flex items-center justify-center hover:scale-110"
          title={isVisible ? "Hide on live website" : "Show on live website"}
        >
          {isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      )}

      <div ref={inputContainerRef} className="relative pointer-events-auto flex gap-2">
        <div className="relative">
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
    </div>
  )

  const imageClasses = `${className || ''} transition-opacity ${isUploading ? 'opacity-50' : ''} ${!isVisible ? 'opacity-30 grayscale' : ''}`

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
      <Image src={currentSrc} className={imageClasses} priority={priority} loading={priority ? "eager" : loading} fetchPriority={priority ? "high" : undefined} {...props} />
      {overlay}
    </div>
  )
}
