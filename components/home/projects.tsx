'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { PROJECTS } from '@/lib/projects-data'
import { EditableText } from '@/components/admin/EditableText'
import { EditableCard } from '@/components/admin/EditableCard'
import { EditableImage } from '@/components/admin/EditableImage'
import { useContent } from '@/components/admin/ContentProvider'

export function Projects() {
  const { content } = useContent()

  return (
    <section className="container-px mx-auto max-w-[1536px] py-14 lg:py-20">
      <SectionHeading
        eyebrow={<EditableText section="home_projects" fieldKey="eyebrow">Our Work</EditableText>}
        title={<EditableText section="home_projects" fieldKey="title" multiline>Trusted on projects across the country</EditableText>}
        description={<EditableText section="home_projects" fieldKey="description" multiline>From single-department upgrades to full turnkey hospital builds, we deliver on time and to specification.</EditableText>}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => {
          const cardId = `proj_${i}`
          const title = content['home_projects']?.[`${cardId}_title`] || p.title
          const desc = content['home_projects']?.[`${cardId}_desc`] || p.shortDesc
          const stat = content['home_projects']?.[`${cardId}_stat`] || p.stat
          const location = content['home_projects']?.[`${cardId}_location`] || p.location
          const category = content['home_projects']?.[`${cardId}_category`] || p.category
          const image = content['home_projects']?.[`${cardId}_image`] || p.image || '/placeholder.svg'
          const btnText = content['home_projects']?.[`${cardId}_btn`] || 'View case study'

          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <EditableCard
                section="home_projects"
                cardId={cardId}
                as={Link}
                // @ts-ignore
                href={`/projects/${p.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                fields={[
                  { key: 'image', label: 'Cover Image', type: 'image', defaultValue: p.image || '/placeholder.svg' },
                  { key: 'category', label: 'Category', type: 'text', defaultValue: p.category },
                  { key: 'location', label: 'Location', type: 'text', defaultValue: p.location },
                  { key: 'stat', label: 'Key Statistic', type: 'text', defaultValue: p.stat },
                  { key: 'title', label: 'Title', type: 'text', defaultValue: p.title },
                  { key: 'desc', label: 'Short Description', type: 'textarea', defaultValue: p.shortDesc },
                  { key: 'btn', label: 'Button Text', type: 'text', defaultValue: 'View case study' }
                ]}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <EditableImage
                    section="home_projects"
                    fieldKey={`${cardId}_image`}
                    defaultSrc={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent pointer-events-none" />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground pointer-events-none">
                    {category}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-sm font-medium text-primary-foreground">
                    <MapPin className="size-4" />
                    {location}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-accent-foreground/80">{stat}</p>
                  <h3 className="mt-1 text-lg font-bold leading-snug text-foreground">{title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {btnText}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </EditableCard>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
