export const dynamic = 'force-dynamic';
import { Hero } from '@/components/home/hero'
import { Stats } from '@/components/home/stats'
import { FeaturedSolutions } from '@/components/home/featured-solutions'
import { EquipmentCategories } from '@/components/home/equipment-categories'
import { WhyChoose } from '@/components/home/why-choose'
import { Projects } from '@/components/home/projects'
import { Testimonials } from '@/components/home/testimonials'
import { BlogPreview } from '@/components/home/blog-preview'
import { CTA } from '@/components/home/cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedSolutions />
      <EquipmentCategories />
      <WhyChoose />
      <Projects />
      <Testimonials />
      <BlogPreview />
      <CTA />
    </>
  )
}
