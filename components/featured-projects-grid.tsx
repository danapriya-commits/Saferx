'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { PROJECTS, ProjectData } from '@/lib/projects-data'
import { EditableImage } from '@/components/admin/EditableImage'
import { useContent } from '@/components/admin/ContentProvider'
import { ProjectModal } from '@/components/project-modal'

export function FeaturedProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const { content, isEditing } = useContent()

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        {PROJECTS.map((project) => {
          const isVisible = content['projects']?.[`featured_img_${project.slug}_visible`] !== 'false'
          if (!isEditing && !isVisible) return null
          
          return (
          <div key={project.slug} className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm border border-border hover:shadow-lg transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
              <EditableImage
                section="projects"
                fieldKey={`featured_img_${project.slug}`}
                defaultSrc={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-md">
                {project.category}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {project.location}</span>
                <span>{project.completionYear}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm font-semibold text-accent-foreground mb-4">Client: {project.clientType}</p>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                {project.shortDesc}
              </p>
              
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Equipment:</p>
                <div className="flex flex-wrap gap-2">
                  {project.equipmentImplemented.slice(0, 3).map((eq, idx) => (
                    <span key={idx} className="inline-flex rounded-md bg-secondary px-2 py-1 text-xs font-medium text-foreground">
                      {eq.split(' ')[0]} {eq.split(' ')[1] || ''}
                    </span>
                  ))}
                  {project.equipmentImplemented.length > 3 && (
                    <span className="inline-flex rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                      +{project.equipmentImplemented.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <button 
                onClick={() => setSelectedProject(project)}
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 mt-auto"
              >
                View Details
              </button>
            </div>
          </div>
          )
        })}
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  )
}
