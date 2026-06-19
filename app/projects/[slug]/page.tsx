import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Building2, CheckCircle2, Cog, Stethoscope, TrendingUp } from 'lucide-react'
import { PROJECTS } from '@/lib/projects-data'
import { CTA } from '@/components/home/cta'
import { EditableImage } from '@/components/admin/EditableImage'

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. Project Hero Header */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <EditableImage
            section="projects"
            fieldKey={`featured_img_${project.slug}`}
            defaultSrc={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-[1536px] container-px">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to all projects
          </Link>
          
          <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {project.category}
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-8 max-w-4xl">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {project.location}
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              {project.clientType}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Completed: {project.completionYear}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            
            {/* Left Column: Descriptive Content */}
            <div className="lg:col-span-7 space-y-12">
              
              <div className="rounded-2xl overflow-hidden shadow-md border border-border">
                 <div className="relative aspect-[16/9] w-full">
                    <EditableImage
                      section="projects"
                      fieldKey={`featured_img_${project.slug}`}
                      defaultSrc={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                 </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Cog className="h-6 w-6 text-accent" />
                  Client Requirements & Challenges
                </h2>
                <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none">
                  <p className="leading-relaxed">{project.requirements}</p>
                </div>
              </div>

              <div className="bg-secondary/10 p-8 sm:p-10 rounded-2xl border border-border/50">
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  Solutions Provided
                </h2>
                <div className="prose prose-lg dark:prose-invert text-muted-foreground max-w-none mb-8">
                  <p className="leading-relaxed">{project.solutions}</p>
                </div>
                
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Project Scope Included:</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.scope.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium text-foreground/90">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Column: Lists & Results */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Equipment Card */}
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Cog className="w-32 h-32" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-6 relative z-10">
                  Equipment Implemented
                </h3>
                <ul className="space-y-4 relative z-10">
                  {project.equipmentImplemented.map((eq, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xs">
                        0{i + 1}
                      </div>
                      <span className="text-sm font-medium text-foreground/80 mt-1">{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact Card */}
              <div className="rounded-2xl border border-border bg-primary p-8 text-primary-foreground shadow-lg relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <TrendingUp className="w-48 h-48" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-6 relative z-10">
                  Results & Impact
                </h3>
                <ul className="space-y-5 relative z-10">
                  {project.impact.map((result, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                      <span className="text-sm font-medium text-primary-foreground/90">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Contact Box */}
              <div className="rounded-2xl bg-secondary/20 p-8 border border-border text-center">
                <h3 className="font-heading text-lg font-bold text-foreground mb-3">Planning a Similar Project?</h3>
                <p className="text-sm text-muted-foreground mb-6">Our technology planning experts are ready to help you optimize your next healthcare facility build.</p>
                <Link 
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-md"
                >
                  Request Consultation
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
