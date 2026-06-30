'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Eye } from 'lucide-react'
import { PROJECTS, ProjectData } from '@/lib/projects-data'
import { EditableImage } from '@/components/admin/EditableImage'
import { EditableCard } from '@/components/admin/EditableCard'
import { useContent } from '@/components/admin/ContentProvider'
import { ProjectModal } from '@/components/project-modal'

export function FeaturedProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const { content, isEditing } = useContent()

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-3">
        {PROJECTS.map((project) => {
          const cardId = `featured_${project.slug}`
          const title = content['projects']?.[`${cardId}_title`] || project.title
          const clientType = content['projects']?.[`${cardId}_clientType`] || project.clientType
          const shortDesc = content['projects']?.[`${cardId}_shortDesc`] || project.shortDesc
          const location = content['projects']?.[`${cardId}_location`] || project.location
          const completionYear = content['projects']?.[`${cardId}_completionYear`] || project.completionYear
          
          const equipmentStr = content['projects']?.[`${cardId}_equipment`] 
          const equipmentList = equipmentStr ? equipmentStr.split(',').map((s: string) => s.trim()) : project.equipmentImplemented
          const image = content['projects']?.[`featured_img_${project.slug}`] || project.image

          const isVisible = content['projects']?.[`featured_img_${project.slug}_visible`] !== 'false'
          if (!isEditing && !isVisible) return null

          const mergedProject = {
            ...project,
            title,
            clientType,
            shortDesc,
            location,
            completionYear,
            image,
            equipmentImplemented: equipmentList,
          }
          
          return (
          <EditableCard
            key={project.slug}
            section="projects"
            cardId={cardId}
            allowDelete={true}
            fields={[
              { key: 'title', label: 'Title', type: 'text', defaultValue: project.title },
              { key: 'clientType', label: 'Client Type', type: 'text', defaultValue: project.clientType },
              { key: 'shortDesc', label: 'Short Description', type: 'textarea', defaultValue: project.shortDesc },
              { key: 'location', label: 'Location', type: 'text', defaultValue: project.location },
              { key: 'completionYear', label: 'Completion Year', type: 'text', defaultValue: project.completionYear },
              { key: 'equipment', label: 'Key Equipment (comma separated)', type: 'textarea', defaultValue: project.equipmentImplemented.join(', ') }
            ]}
          >
            <div className="group flex flex-col h-full overflow-hidden rounded-2xl bg-card shadow-sm border border-border hover:shadow-lg transition-all relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary/30">
                <EditableImage
                  section="projects"
                  fieldKey={`featured_img_${project.slug}`}
                  defaultSrc={project.image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-md shadow-sm">
                  {project.category}
                </div>
                {!isEditing && (
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedProject(mergedProject); }}
                    className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground opacity-0 group-hover:opacity-100"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {location}</span>
                  <span>{completionYear}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-sm font-semibold text-accent-foreground mb-4">Client: {clientType}</p>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {shortDesc}
                </p>
                
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Key Equipment:</p>
                  <div className="flex flex-wrap gap-2">
                    {equipmentList.slice(0, 3).map((eq: string, idx: number) => (
                      <span key={idx} className="inline-flex rounded-md bg-secondary px-2 py-1 text-xs font-medium text-foreground">
                        {eq.split(' ')[0]} {eq.split(' ')[1] || ''}
                      </span>
                    ))}
                    {equipmentList.length > 3 && (
                      <span className="inline-flex rounded-md bg-secondary/50 px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{equipmentList.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedProject(mergedProject); }}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 mt-auto gap-2"
                >
                  <Eye className="h-4 w-4" /> View Details
                </button>
              </div>
            </div>
          </EditableCard>
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
