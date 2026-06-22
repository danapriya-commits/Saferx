'use client'

import { EditableImage } from '@/components/admin/EditableImage'
import { useContent } from '@/components/admin/ContentProvider'
import { useEffect, useState } from 'react'

export function ProjectGalleryGrid({ images }: { images: string[] }) {
  const { content, isEditing } = useContent()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {images.map((src, i) => {
        const fieldKey = `gallery_img_${i}`
        const isVisible = content['projects']?.[`${fieldKey}_visible`] !== 'false'
        
        // If not in editing mode and explicitly hidden, skip rendering the ENTIRE wrapper
        if (!isEditing && !isVisible) return null

        return (
          <div key={i} className="break-inside-avoid relative overflow-hidden rounded-2xl group border border-border shadow-sm" style={{ height: i % 2 === 0 ? '800px' : '500px' }}>
            <EditableImage
              section="projects"
              fieldKey={fieldKey}
              defaultSrc={src}
              alt={`Project Installation ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        )
      })}
    </div>
  )
}
