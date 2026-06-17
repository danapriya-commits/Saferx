import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, CheckCircle2, Building2, ScanLine, Activity, Baby, Microscope, Wrench } from 'lucide-react'
import { PageHero } from '@/components/section'
import { CTA } from '@/components/home/cta'
import { PROJECTS } from '@/lib/projects-data'
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'

export const metadata = {
  title: 'Healthcare Projects & Success Stories | SAFERX',
  description: 'Showcasing our completed and ongoing healthcare projects, hospital infrastructure solutions, and medical equipment installations.',
}

const STATS = [
  { id: 'stat1', defaultLabel: 'Equipment Installations', defaultValue: '100+' },
  { id: 'stat2', defaultLabel: 'Healthcare Facilities Supported', defaultValue: '50+' },
  { id: 'stat3', defaultLabel: 'ICU & NICU Projects', defaultValue: '20+' },
  { id: 'stat4', defaultLabel: 'Diagnostic Centre Setups', defaultValue: '10+' },
]

const CATEGORIES = [
  { id: 'cat1', name: 'ICU & Critical Care Projects', icon: Activity },
  { id: 'cat2', name: 'NICU Development Projects', icon: Baby },
  { id: 'cat3', name: 'Diagnostic Centre Setup', icon: ScanLine },
  { id: 'cat4', name: 'Imaging Department Installations', icon: ScanLine },
  { id: 'cat5', name: 'Laboratory Infrastructure Projects', icon: Microscope },
  { id: 'cat6', name: 'Hospital Expansion Projects', icon: Building2 },
  { id: 'cat7', name: 'Day Care Surgery Centre Setup', icon: Wrench },
]

const WHY_CHOOSE = [
  { id: 'why1', title: 'Clinical Workflow Understanding', desc: 'We plan equipment placement to optimize staff movement and patient care efficiency.' },
  { id: 'why2', title: 'Technology Planning Expertise', desc: 'Ensuring you invest in future-proof technology that aligns with your operational goals.' },
  { id: 'why3', title: 'Long-Term Support', desc: 'Comprehensive AMC and biomedical support to maintain maximum equipment uptime.' },
  { id: 'why4', title: 'Procurement Advisory', desc: 'Unbiased consulting to help you select the best brands within your budget.' },
  { id: 'why5', title: 'Biomedical Engineering Knowledge', desc: 'Expert technical staff ensuring flawless installation and calibration.' },
]

const GALLERY_IMAGES = [
  '/images/hero-icu.png',
  '/images/project-diagnostic.png',
  '/images/cat-lab.png',
  '/images/project-hospital.png',
  '/images/cat-imaging.png',
  '/images/cat-neonatal.png',
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <PageHero
        title={<EditableText section="projects" fieldKey="hero_title">Healthcare Projects & Success Stories</EditableText>}
        description={<EditableText section="projects" fieldKey="hero_description">Delivering reliable medical technology solutions for hospitals, diagnostic centres, ICUs, NICUs, imaging departments, and laboratories.</EditableText>}
        breadcrumb="Projects"
        eyebrow={<EditableText section="projects" fieldKey="hero_eyebrow">Our Work</EditableText>}
        backgroundImage="/images/project-hospital.png"
        section="projects"
        fieldKey="hero_bg"
      />

      {/* 2. Project Statistics Section */}
      <section className="bg-primary/5 py-12 border-b border-border">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center justify-center text-center px-4">
                <span className="font-heading text-4xl sm:text-5xl font-extrabold text-primary mb-2">
                  <EditableText section="projects" fieldKey={`${stat.id}_value`}>{stat.defaultValue}</EditableText>
                </span>
                <span className="text-sm font-medium text-foreground/80 uppercase tracking-wider">
                  <EditableText section="projects" fieldKey={`${stat.id}_label`}>{stat.defaultLabel}</EditableText>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Project Categories Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <EditableText section="projects" fieldKey="areas_title">Areas of Expertise</EditableText>
            </h2>
            <p className="text-lg text-muted-foreground">
              <EditableText section="projects" fieldKey="areas_desc">We provide end-to-end project execution across specialized healthcare departments.</EditableText>
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="group relative overflow-hidden rounded-2xl bg-secondary/10 border border-border p-6 transition-all hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-1">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <cat.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  <EditableText section="projects" fieldKey={`${cat.id}_name`}>{cat.name}</EditableText>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section */}
      <section className="py-16 sm:py-24 bg-secondary/10">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                <EditableText section="projects" fieldKey="featured_title">Featured Implementations</EditableText>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <EditableText section="projects" fieldKey="featured_desc">Explore our recent success stories and see how we help healthcare facilities scale their operations.</EditableText>
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {PROJECTS.map((project) => (
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

                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Project Gallery (Masonry Grid Simulation) */}
      <section className="py-16 sm:py-24 bg-background overflow-hidden">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
              <EditableText section="projects" fieldKey="gallery_title">Project Gallery</EditableText>
            </h2>
            <p className="text-lg text-muted-foreground">
              <EditableText section="projects" fieldKey="gallery_desc">A glimpse into our state-of-the-art installations and hospital setups.</EditableText>
            </p>
          </div>
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className="break-inside-avoid relative overflow-hidden rounded-2xl group border border-border shadow-sm" style={{ height: i % 2 === 0 ? '800px' : '500px' }}>
                <EditableImage
                  section="projects"
                  fieldKey={`gallery_img_${i}`}
                  defaultSrc={src}
                  alt={`Project Installation ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Saferx */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
                <EditableText section="projects" fieldKey="why_title">Why Partner With Us?</EditableText>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                <EditableText section="projects" fieldKey="why_desc">We go beyond simply supplying equipment. We act as your strategic technology partner, ensuring every square foot of your clinical space is optimized for patient care and operational efficiency.</EditableText>
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-primary transition-all hover:bg-gray-100 shadow-lg"
              >
                Discuss Your Project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              {WHY_CHOOSE.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white/10 p-6 border border-white/20 backdrop-blur-sm">
                  <CheckCircle2 className="h-8 w-8 text-accent mb-4" />
                  <h3 className="font-heading text-lg font-bold mb-2">
                    <EditableText section="projects" fieldKey={`${item.id}_title`}>{item.title}</EditableText>
                  </h3>
                  <p className="text-sm text-primary-foreground/70 leading-relaxed">
                    <EditableText section="projects" fieldKey={`${item.id}_desc`}>{item.desc}</EditableText>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <div className="mt-20">
        <CTA />
      </div>
    </div>
  )
}
