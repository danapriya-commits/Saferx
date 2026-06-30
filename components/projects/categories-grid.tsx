'use client'

import { Activity, Baby, ScanLine, Microscope, Building2, Wrench } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { EditableCard } from '@/components/admin/EditableCard'

const CATEGORIES = [
  { id: 'cat1', name: 'ICU & Critical Care Projects', icon: Activity },
  { id: 'cat2', name: 'NICU Development Projects', icon: Baby },
  { id: 'cat3', name: 'Diagnostic Centre Setup', icon: ScanLine },
  { id: 'cat4', name: 'Imaging Department Installations', icon: ScanLine },
  { id: 'cat5', name: 'Laboratory Infrastructure Projects', icon: Microscope },
  { id: 'cat6', name: 'Hospital Expansion Projects', icon: Building2 },
  { id: 'cat7', name: 'Day Care Surgery Centre Setup', icon: Wrench },
]

export function CategoriesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {CATEGORIES.map((cat) => (
        <EditableCard
          key={cat.id}
          section="projects"
          cardId={`category_${cat.id}`}
          fields={[]}
          allowDelete={false}
          className="group relative overflow-hidden rounded-2xl bg-secondary/10 border border-border p-6 transition-all hover:bg-primary/5 hover:border-primary/30 hover:-translate-y-1"
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm border border-border group-hover:bg-primary group-hover:text-primary-foreground transition-colors pointer-events-none">
            <cat.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
          </div>
          <h3 className="font-heading text-lg font-bold text-foreground">
            <EditableText section="projects" fieldKey={`${cat.id}_name`}>{cat.name}</EditableText>
          </h3>
        </EditableCard>
      ))}
    </div>
  )
}
