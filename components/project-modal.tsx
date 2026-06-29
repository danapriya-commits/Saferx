'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, CheckCircle2, Building2, MapPin, Calendar, Users, Wrench } from 'lucide-react'
import { ProjectData } from '@/lib/projects-data'
import { EditableImage } from '@/components/admin/EditableImage'

interface ProjectModalProps {
  project: ProjectData
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on Escape key
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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header / Close Button */}
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 min-h-0 flex-col overflow-y-auto md:flex-row">
          
          {/* Left Side: Image & Meta */}
          <div className="md:w-2/5 md:shrink-0 bg-secondary/20 p-6 flex flex-col">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-background shadow-sm border border-border/50 mb-6">
              <EditableImage
                section="projects"
                fieldKey={`featured_img_${project.slug}`}
                defaultSrc={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Building2 className="h-4 w-4 text-primary shrink-0" />
                <span>{project.clientType}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <span>Completed: {project.completionYear}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="flex-1 p-6 md:p-10 space-y-8">
            
            {/* Title & Basics */}
            <div>
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground mb-4">
                {project.category}
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                {project.title}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.shortDesc}
              </p>
            </div>

            {/* Requirements & Solutions */}
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">The Challenge</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{project.requirements}</p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Our Solution</h3>
                <p className="text-sm text-foreground/80 leading-relaxed">{project.solutions}</p>
              </div>
            </div>

            {/* Scope of Work */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">
                Scope of Work
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.scope.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment Implemented */}
            <div className="pb-8 md:pb-12">
              <h3 className="flex items-center gap-2 font-heading text-lg font-bold mb-4 text-foreground">
                <Wrench className="h-5 w-5 text-primary" />
                Key Equipment Implemented
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.equipmentImplemented.map((eq: string, i: number) => (
                  <span key={i} className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-foreground border border-border/50">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
