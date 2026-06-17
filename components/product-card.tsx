import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/products-data'
import { EditableImage } from '@/components/admin/EditableImage'

export function ProductCard({ 
  product, 
  onViewDetails 
}: { 
  product: Product
  onViewDetails?: (product: Product) => void
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/30">
        <EditableImage
          section="equipment"
          fieldKey={`image_${product.id}`}
          defaultSrc={product.image}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-primary">
            {product.category}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {product.department}
          </span>
        </div>

        <h3 className="mb-3 font-heading text-xl font-bold leading-tight text-foreground">
          {product.name}
        </h3>
        
        <p className="mb-6 line-clamp-3 text-sm text-muted-foreground flex-1">
          {product.description}
        </p>

        {/* Features */}
        <ul className="mb-6 space-y-2">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
              <feature.icon className="h-4 w-4 text-accent shrink-0" />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
          <Link
            href={`/contact?product=${product.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Request Quote
          </Link>
          <button
            onClick={() => onViewDetails?.(product)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground group/btn"
          >
            Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
