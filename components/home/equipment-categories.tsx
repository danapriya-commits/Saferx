'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContent } from '@/components/admin/ContentProvider'
import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/section'
import { Reveal } from '@/components/reveal'
import { ProductCard } from '@/components/product-card'

export function EquipmentCategories() {
  const { content, isEditing } = useContent()
  const router = useRouter()
  const [equipmentList, setEquipmentList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch('/api/public/equipment')
        if (res.ok) {
          const data = await res.json()
          setEquipmentList(data.equipment || [])
        }
      } catch (error) {
        console.error("Failed to fetch equipment", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEquipment()
  }, [])

  const displayProducts = equipmentList.slice(0, 3)

  return (
    <section className="bg-secondary/40 py-14 sm:py-20">
      <div className="mx-auto max-w-[1536px] container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Medical Equipment"
            title="Browse our equipment"
            description="Genuine, certified equipment from the world's leading manufacturers — with installation, training and AMC included."
          />
          <Link
            href="/equipment"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            View full catalog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm h-[400px]">
                <div className="relative aspect-[4/3] bg-secondary/30 skeleton" />
                <div className="flex flex-1 flex-col p-6 space-y-4">
                  <div className="h-6 w-3/4 bg-secondary rounded-md skeleton" />
                  <div className="space-y-2 mt-4">
                    <div className="h-4 w-full bg-secondary rounded-md skeleton" />
                    <div className="h-4 w-2/3 bg-secondary rounded-md skeleton" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            displayProducts.map((product, i) => {
              const isVisible = content['equipment']?.[`image_${product.id}_visible`] !== 'false'
              if (!isEditing && !isVisible) return null
              
              return (
                <Reveal key={product.id} delay={i * 0.06}>
                  <ProductCard 
                    product={{
                      id: product.id,
                      name: product.title,
                      description: product.short_description,
                      department: product.category,
                      category: product.category,
                      image: product.image_url ? product.image_url : '/images/placeholder.jpg',
                      features: [],
                      technicalSpecs: product.specifications ? [product.specifications] : [],
                      benefits: [],
                      installationSupport: ''
                    }} 
                    onViewDetails={() => router.push(`/equipment?product=${product.id}`)}
                  />
                </Reveal>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
