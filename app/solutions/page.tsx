import { PageHero } from '@/components/section'
import { SOLUTIONS_DATA } from '@/lib/solutions-content'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'

export default function SolutionsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={<EditableText section="solutions_hub" fieldKey="hero_title">Comprehensive Healthcare Solutions</EditableText>}
        description={<EditableText section="solutions_hub" fieldKey="hero_description">Expert guidance and premium technology solutions spanning hospital infrastructure, medical equipment, and lifecycle management.</EditableText>}
        breadcrumb="Solutions"
        eyebrow={<EditableText section="solutions_hub" fieldKey="hero_eyebrow">Our Expertise</EditableText>}
        backgroundImage="/images/solutionheader.png"
        section="solutions_hub"
        fieldKey="hero_bg"
      />

      <section className="py-16 sm:py-24 bg-secondary/10">
        <div className="mx-auto max-w-[1536px] container-px">
          
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl mb-6">
              <EditableText section="solutions_hub" fieldKey="intro_title">Empowering Healthcare Delivery</EditableText>
            </h2>
            <p className="text-lg text-muted-foreground">
              <EditableText section="solutions_hub" fieldKey="intro_desc">Whether you are building a new facility, expanding clinical services, or upgrading existing technology, we work alongside your team to identify solutions that align with both clinical and operational goals.</EditableText>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS_DATA.map((solution) => (
              <Link 
                href={`/solutions/${solution.slug}`} 
                key={solution.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50"
              >
                <div className="relative h-48 overflow-hidden bg-secondary/20">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <EditableImage
                    asImg
                    section="solutions_hub"
                    fieldKey={`image_${solution.slug}`}
                    defaultSrc={solution.image}
                    alt={solution.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-background/90 shadow-sm backdrop-blur-md">
                    <solution.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-6">
                    {solution.shortDescription}
                  </p>
                  
                  <div className="mt-auto flex items-center text-sm font-semibold text-primary">
                    Explore Solution
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
