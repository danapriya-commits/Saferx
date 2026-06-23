'use client'

import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { PageHero } from '@/components/section'
import { EQUIPMENT_CATEGORIES } from '@/lib/equipment-data'
import { ProductCard } from '@/components/product-card'
import { ProductModal } from '@/components/product-modal'
import { cn } from '@/lib/utils'
import { Search, ShieldCheck, Wrench, Settings2, Activity, Phone } from 'lucide-react'
import Link from 'next/link'
import { EditableText } from '@/components/admin/EditableText'
import { useContent } from '@/components/admin/ContentProvider'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Plus, AlertTriangle } from 'lucide-react'
import { Suspense } from 'react'

export default function EquipmentPage() {
  return (
    <Suspense fallback={<div>Loading equipment...</div>}>
      <EquipmentPageContent />
    </Suspense>
  )
}

function EquipmentPageContent() {
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [equipmentList, setEquipmentList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { isEditing, content, updateContent } = useContent()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const productParam = searchParams.get('product')

  useEffect(() => {
    setMounted(true)
  }, [])

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

  useEffect(() => {
    fetchEquipment()
  }, [])

  useEffect(() => {
    if (productParam && equipmentList.length > 0 && !selectedProduct) {
      const found = equipmentList.find(p => p.id === productParam)
      if (found) {
        setSelectedProduct({
          id: found.id,
          name: found.title,
          description: found.full_description || found.short_description,
          department: found.category,
          category: found.category,
          image: found.image_url ? found.image_url : '/images/placeholder.jpg',
          features: [],
          technicalSpecs: found.specifications ? [found.specifications] : [],
          benefits: [],
          installationSupport: ''
        })
      }
    }
  }, [productParam, equipmentList])

  // Filter products based on active category and search query
  const filteredProducts = useMemo(() => {
    return equipmentList.filter((product) => {
      const isVisible = content['equipment']?.[`image_${product.id}_visible`] !== 'false'
      if (!isEditing && !isVisible) return false

      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesSearch = (product.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.short_description || '').toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, equipmentList, content, isEditing])

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title={<EditableText section="equipment" fieldKey="hero_title">Advanced Medical Equipment Solutions</EditableText>}
        description={<EditableText section="equipment" fieldKey="hero_description">Trusted Equipment for Hospitals, Diagnostic Centres, Clinics & Healthcare Facilities</EditableText>}
        breadcrumb="Medical Equipment"
        eyebrow={<EditableText section="equipment" fieldKey="hero_eyebrow">Our Catalog</EditableText>}
        backgroundImage="/images/medicalheader.png"
      />

      {/* Main Content & Products */}
      <section className="py-14 sm:py-20 flex-1 bg-secondary/10">
        <div className="mx-auto max-w-[1536px] container-px">
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar / Filters */}
            <div className="w-full lg:w-72 shrink-0 space-y-6 lg:sticky lg:top-32">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search equipment..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <h3 className="mb-4 font-semibold text-foreground px-2">Categories</h3>
                <nav className="flex flex-col gap-1">
                  <button
                    onClick={() => setActiveCategory('All')}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      activeCategory === 'All' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    All Equipment
                  </button>
                  {EQUIPMENT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left',
                        activeCategory === cat.name 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      )}
                    >
                      <cat.icon className="h-4 w-4 shrink-0" />
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 w-full">
              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                      <div className="relative aspect-[4/3] bg-secondary/30 skeleton" />
                      <div className="flex flex-1 flex-col p-6 space-y-4">
                        <div className="flex justify-between"><div className="h-5 w-24 bg-primary/10 rounded-full skeleton" /><div className="h-5 w-20 bg-secondary rounded-full skeleton" /></div>
                        <div className="h-6 w-3/4 bg-secondary rounded-md skeleton" />
                        <div className="space-y-2 mt-4"><div className="h-4 w-full bg-secondary rounded-md skeleton" /><div className="h-4 w-full bg-secondary rounded-md skeleton" /><div className="h-4 w-2/3 bg-secondary rounded-md skeleton" /></div>
                        <div className="mt-auto pt-4 grid grid-cols-2 gap-3 border-t border-border/50">
                          <div className="h-9 bg-secondary rounded-lg skeleton" />
                          <div className="h-9 bg-secondary rounded-lg skeleton" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map(product => {
                    const isVisible = content['equipment']?.[`image_${product.id}_visible`] !== 'false'
                    return (
                    <div key={product.id} className={`relative group/edit transition-all duration-300 ${!isVisible ? 'opacity-40 grayscale' : ''}`}>
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
                        onViewDetails={() => {
                          if (isEditing) {
                            setEditingProduct(product)
                          } else {
                            setSelectedProduct({
                              id: product.id,
                              name: product.title,
                              description: product.full_description || product.short_description,
                              department: product.category,
                              category: product.category,
                              image: product.image_url ? product.image_url : '/images/placeholder.jpg',
                              features: [],
                              technicalSpecs: product.specifications ? [product.specifications] : [],
                              benefits: [],
                              installationSupport: ''
                            })
                          }
                        }}
                      />
                      {isEditing && (
                        <div className="absolute -top-3 -right-3 z-10 hidden group-hover/edit:flex gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateContent('equipment', `image_${product.id}_visible`, isVisible ? 'false' : 'true', 'visibility');
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-white shadow-sm hover:bg-slate-700 hover:scale-110 transition-all"
                            title={isVisible ? "Hide Equipment" : "Show Equipment"}
                          >
                            {isVisible ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setDeletingProductId(product.id)
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm hover:bg-red-600 hover:text-white hover:scale-110 transition-all"
                            title="Delete Equipment"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  )})}
                  {isEditing && (
                    <button 
                      onClick={() => setIsAddModalOpen(true)}
                      className="group flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-secondary/10 hover:bg-secondary/30 transition-all duration-300 hover:-translate-y-1 min-h-[350px] cursor-pointer"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                        <Plus className="h-8 w-8" />
                      </div>
                      <span className="font-heading text-lg font-semibold text-foreground">Add New Equipment</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center bg-card shadow-sm">
                  {isEditing ? (
                    <>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <Plus className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">Ready to add equipment?</h3>
                      <p className="text-muted-foreground mt-2 max-w-sm mb-6">
                        Click the button below to add your first piece of equipment to this category.
                      </p>
                      <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="h-4 w-4" /> Add New Equipment
                      </button>
                    </>
                  ) : (
                    <>
                      <Search className="h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground">No equipment found</h3>
                      <p className="text-muted-foreground mt-2 max-w-sm">
                        We couldn't find any equipment matching your search criteria. Try adjusting your filters or search terms.
                      </p>
                      <button 
                        onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                        className="mt-6 font-medium text-primary hover:underline"
                      >
                        Clear all filters
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Saferx Section */}
      <section className="border-t border-border bg-card py-16">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground"><EditableText section="equipment" fieldKey="why_title">Why Choose Saferx?</EditableText></h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              <EditableText section="equipment" fieldKey="why_desc">We partner with global manufacturers to deliver enterprise-grade medical technologies backed by exceptional service.</EditableText>
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 text-center transition-all hover:bg-secondary/40">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-foreground mb-2"><EditableText section="equipment" fieldKey="why1_title">Quality Assured Equipment</EditableText></h4>
              <p className="text-sm text-muted-foreground"><EditableText section="equipment" fieldKey="why1_desc">Certified products meeting stringent international standards.</EditableText></p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 text-center transition-all hover:bg-secondary/40">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Settings2 className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-foreground mb-2"><EditableText section="equipment" fieldKey="why2_title">Installation & Commissioning</EditableText></h4>
              <p className="text-sm text-muted-foreground"><EditableText section="equipment" fieldKey="why2_desc">Expert on-site setup and clinical application training.</EditableText></p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 text-center transition-all hover:bg-secondary/40">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Activity className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-foreground mb-2"><EditableText section="equipment" fieldKey="why3_title">Preventive Maintenance</EditableText></h4>
              <p className="text-sm text-muted-foreground"><EditableText section="equipment" fieldKey="why3_desc">Comprehensive AMC plans to ensure maximum uptime.</EditableText></p>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/20 p-6 text-center transition-all hover:bg-secondary/40">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
                <Wrench className="h-7 w-7" />
              </div>
              <h4 className="font-semibold text-foreground mb-2"><EditableText section="equipment" fieldKey="why4_title">Expert Technical Assistance</EditableText></h4>
              <p className="text-sm text-muted-foreground"><EditableText section="equipment" fieldKey="why4_desc">24/7 dedicated biomedical support and rapid repair services.</EditableText></p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Consultation CTA */}
      <section className="bg-primary py-16 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="mx-auto max-w-[1536px] container-px text-center relative z-10">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            <EditableText section="equipment" fieldKey="cta_title">Need Help Selecting the Right Medical Equipment?</EditableText>
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            <EditableText section="equipment" fieldKey="cta_desc">Our specialists help hospitals and healthcare facilities choose the most suitable solutions based on clinical requirements, workflow needs, and budget.</EditableText>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 font-semibold text-accent-foreground transition-all hover:bg-accent/90 shadow-lg hover:-translate-y-0.5"
            >
              Request Consultation
            </Link>
            <Link 
              href="#inquiry"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-8 font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-primary-foreground/20"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="inquiry" className="py-20 bg-card scroll-mt-20">
        <div className="mx-auto max-w-3xl container-px">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground">Equipment Inquiry</h2>
            <p className="mt-2 text-muted-foreground">Fill out the form below to request a quote or schedule a consultation.</p>
          </div>
          
          <div className="rounded-2xl border border-border bg-background p-6 md:p-10 shadow-lg">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                  <input type="text" id="name" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Dr. John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="hospital" className="text-sm font-medium text-foreground">Hospital / Organization</label>
                  <input type="text" id="hospital" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="City General Hospital" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                  <input type="tel" id="phone" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="+91 90000 00000" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                  <input type="email" id="email" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="john@hospital.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="equipment" className="text-sm font-medium text-foreground">Equipment Required</label>
                <select id="equipment" defaultValue="" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="" disabled>Select equipment category...</option>
                  <option value="monitoring">Monitoring Systems</option>
                  <option value="critical-care">Critical Care</option>
                  <option value="imaging">Diagnostic Imaging</option>
                  <option value="lab">Laboratory Equipment</option>
                  <option value="neonatal">Maternal & Neonatal Care</option>
                  <option value="ot">Operation Theatre Equipment</option>
                  <option value="multiple">Multiple / Complete Setup</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message / Specifications</label>
                <textarea id="message" rows={4} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Please describe your specific requirements, timeline, and any technical specifications needed..." />
              </div>

              <button type="button" className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Render Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          allProducts={equipmentList.map(p => ({
            id: p.id,
            name: p.title,
            description: p.short_description,
            department: p.category,
            category: p.category,
            image: p.image_url ? p.image_url : '/images/placeholder.jpg',
            features: [],
            technicalSpecs: p.specifications ? [p.specifications] : [],
            benefits: [],
            installationSupport: ''
          }))}
          onClose={() => {
            setSelectedProduct(null)
            if (productParam) {
              const newParams = new URLSearchParams(searchParams.toString())
              newParams.delete('product')
              router.replace(`${pathname}${newParams.toString() ? `?${newParams.toString()}` : ''}`, { scroll: false })
            }
          }} 
          onSelectProduct={setSelectedProduct}
        />
      )}

      {/* Render Edit Equipment Modal */}
      {mounted && editingProduct && createPortal(
        <EditEquipmentModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null)
            fetchEquipment()
          }}
        />,
        document.body
      )}

      {mounted && deletingProductId && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-2xl shadow-xl border border-border p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Delete Equipment</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-6 ml-14">
              Are you sure you want to delete this equipment? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/editor/equipment/${deletingProductId}`, { method: 'DELETE' });
                    if (res.ok) fetchEquipment();
                    else alert('Failed to delete equipment');
                  } catch (e) {
                    console.error(e);
                  }
                  setDeletingProductId(null)
                }}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Render Add Equipment Modal */}
      {mounted && isAddModalOpen && createPortal(
        <AddEquipmentModal 
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false)
            fetchEquipment()
          }}
        />,
        document.body
      )}
    </div>
  )
}

function EditEquipmentModal({ product, onClose, onSuccess }: { product: any, onClose: () => void, onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: product.title || '',
    category: product.category || EQUIPMENT_CATEGORIES[0]?.name || '',
    short_description: product.short_description || '',
    description: product.description || '',
    image_url: product.image_url || ''
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    
    try {
      const res = await fetch('/api/editor/upload', {
        method: 'POST',
        body: fd
      })
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, image_url: data.url }))
      } else {
        alert('Failed to upload image')
      }
    } catch (err) {
      console.error(err)
      alert('Error uploading image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return alert('Title is required')
    
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/editor/equipment/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        onSuccess()
      } else {
        alert('Failed to update equipment')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating equipment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-heading text-xl font-bold">Edit Equipment</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-secondary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <form id="edit-equipment-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              {formData.image_url ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({...prev, image_url: ''}))}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-lg hover:bg-black/70"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Equipment Title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData(prev => ({...prev, category: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {EQUIPMENT_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <textarea 
                rows={2}
                value={formData.short_description}
                onChange={e => setFormData(prev => ({...prev, short_description: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief description for the card"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Detailed specifications and information"
              />
            </div>
          </form>
        </div>
        
        <div className="border-t border-border p-6 flex justify-end gap-3 bg-secondary/20 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="edit-equipment-form"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AddEquipmentModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: EQUIPMENT_CATEGORIES[0]?.name || '',
    short_description: '',
    description: '',
    image_url: ''
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    
    try {
      const res = await fetch('/api/editor/upload', {
        method: 'POST',
        body: fd
      })
      if (res.ok) {
        const data = await res.json()
        setFormData(prev => ({ ...prev, image_url: data.url }))
      } else {
        alert('Failed to upload image')
      }
    } catch (err) {
      console.error(err)
      alert('Error uploading image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return alert('Title is required')
    
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/editor/equipment/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        onSuccess()
      } else {
        alert('Failed to add equipment')
      }
    } catch (err) {
      console.error(err)
      alert('Error adding equipment')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="font-heading text-xl font-bold">Add New Equipment</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-secondary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          <form id="add-equipment-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              {formData.image_url ? (
                <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({...prev, image_url: ''}))}
                    className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-lg hover:bg-black/70"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-muted-foreground" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData(prev => ({...prev, title: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Equipment Title"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData(prev => ({...prev, category: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {EQUIPMENT_CATEGORIES.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Description</label>
              <textarea 
                rows={2}
                value={formData.short_description}
                onChange={e => setFormData(prev => ({...prev, short_description: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Brief description for the card"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Detailed specifications and information"
              />
            </div>
          </form>
        </div>
        
        <div className="border-t border-border p-6 flex justify-end gap-3 bg-secondary/20 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-equipment-form"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Saving...
              </>
            ) : 'Add Equipment'}
          </button>
        </div>
      </div>
    </div>
  )
}
