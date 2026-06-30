'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { X, CheckCircle2, ChevronRight, Settings, HeartPulse, Building2, Wrench } from 'lucide-react'
import { Product } from '@/lib/products-data'
import { cn } from '@/lib/utils'
import { EditableImage } from '@/components/admin/EditableImage'

interface ProductModalProps {
  product: Product
  allProducts?: Product[]
  onClose: () => void
  onSelectProduct: (product: Product) => void
}

export function ProductModal({ product, allProducts = [], onClose, onSelectProduct }: ProductModalProps) {
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

  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 2)

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

          {/* Left Side: Sticky Image & Quick CTA */}
          <div className="md:w-2/5 md:shrink-0 bg-secondary/20 p-6 md:p-8 flex flex-col">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-background shadow-sm border border-border/50 mb-6">
              <EditableImage
                section="equipment"
                fieldKey={`image_${product.id}`}
                defaultSrc={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-auto space-y-4">
              <Link
                href={`/contact?product=${product.id}#contact-form`}
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 shadow-md hover:shadow-primary/20"
              >
                Request Quote
              </Link>
              <p className="text-center text-xs text-muted-foreground">
                Our team will respond shortly
              </p>
            </div>
          </div>

          {/* Right Side: Scrollable Details */}
          <div className="flex-1 p-6 md:p-10 space-y-10">

            {/* Title & Basics */}
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {product.category}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.department}
                </span>
              </div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-semibold mb-4 text-foreground">
                <Settings className="h-5 w-5 text-accent" />
                Technical Specifications
              </h3>
              <ul className="space-y-3">
                {product.technicalSpecs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                    <ChevronRight className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Benefits */}
            <div>
              <h3 className="flex items-center gap-2 font-heading text-xl font-semibold mb-4 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                Clinical & Operational Benefits
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-4 shadow-sm">
                    <p className="text-sm text-foreground/90">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation & Support */}
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold mb-3 text-foreground">
                <Wrench className="h-5 w-5 text-primary" />
                Installation & Service Support
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                {product.installationSupport}
              </p>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="pt-6 pb-6 border-t border-border">
                <h3 className="font-heading text-xl font-semibold mb-6 text-foreground">
                  Related Products
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {relatedProducts.map((related) => (
                    <div
                      key={related.id}
                      onClick={() => onSelectProduct(related)}
                      className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary/30">
                        <EditableImage section="equipment" fieldKey={`image_${related.id}`} defaultSrc={related.image} alt={related.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{related.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{related.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra spacer for bottom gap */}
            <div className="h-4 md:h-6 shrink-0 w-full"></div>

          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
