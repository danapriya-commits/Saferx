import { notFound } from 'next/navigation'
import { SOLUTIONS_DATA } from '@/lib/solutions-content'
import { PageHero } from '@/components/section'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'

// Generate static params for all solutions
export function generateStaticParams() {
  return SOLUTIONS_DATA.map((solution) => ({
    slug: solution.slug,
  }))
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug)

  if (!solution) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={<EditableText section={`solution_${slug}`} fieldKey="title">{solution.title}</EditableText>}
        description={<EditableText section={`solution_${slug}`} fieldKey="shortDescription">{solution.shortDescription}</EditableText>}
        breadcrumb={solution.title}
        eyebrow="Solutions"
        backgroundImage={solution.image}
        section={`solution_${slug}`}
        fieldKey="hero_bg"
      />

      <section className="py-16 sm:py-24 bg-background">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Introduction */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl font-medium text-foreground leading-relaxed">
                  <EditableText section={`solution_${slug}`} fieldKey="intro" type="textarea">{solution.intro}</EditableText>
                </p>
                {solution.subIntro && (
                  <p className="text-muted-foreground whitespace-pre-wrap mt-6">
                    <EditableText section={`solution_${slug}`} fieldKey="subIntro" type="textarea">{solution.subIntro}</EditableText>
                  </p>
                )}
              </div>

              {/* Sections */}
              <div className="space-y-10">
                {solution.sections.map((section, idx) => (
                  <div key={idx} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                      <EditableText section={`solution_${slug}`} fieldKey={`section_${idx}_title`}>{section.title}</EditableText>
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/90 font-medium flex-1">
                            <EditableText section={`solution_${slug}`} fieldKey={`section_${idx}_item_${itemIdx}`} type="textarea">{item}</EditableText>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-primary p-8 sm:p-10 text-primary-foreground text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
                <div>
                  <h3 className="font-heading text-2xl font-bold mb-2">
                    <EditableText section="solutions_hub" fieldKey="cta_title">Ready to Upgrade Your Healthcare Tech?</EditableText>
                  </h3>
                  <p className="text-primary-foreground/80 max-w-xl">
                    <EditableText section="solutions_hub" fieldKey="cta_desc">Speak with our specialists to explore the best equipment and infrastructure solutions for your facility.</EditableText>
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center justify-center rounded-xl bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary shadow-md"
                >
                  Request Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Other Solutions */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sticky top-32">
                <h4 className="font-heading text-xl font-bold text-foreground mb-6">
                  <EditableText section="solutions_hub" fieldKey="sidebar_title">More Solutions</EditableText>
                </h4>
                <div className="space-y-3">
                  {SOLUTIONS_DATA.filter((s) => s.slug !== solution.slug).map((other) => (
                    <Link
                      key={other.slug}
                      href={`/solutions/${other.slug}`}
                      className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-secondary/50 border border-transparent hover:border-border"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <other.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          <EditableText section={`solution_${other.slug}`} fieldKey="title">{other.title}</EditableText>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href="/equipment"
                    className="flex w-full items-center justify-center rounded-xl border-2 border-primary bg-transparent px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    View Equipment Catalog
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
