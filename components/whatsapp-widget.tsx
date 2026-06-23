'use client'

import { useState } from 'react'
import { X, Send, ArrowLeft, Check } from 'lucide-react'
import { WHATSAPP_NUMBER, COMPANY } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const QUICK_REPLIES = [
  'Product Enquiry',
  'Request Quote',
  'AMC Services',
  'Hospital Setup',
  'Contact Sales',
] as const

type Step = 'intro' | 'details' | 'done'

import { usePathname } from 'next/navigation'

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('intro')
  const [topic, setTopic] = useState<string>('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [requirement, setRequirement] = useState('')
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const reset = () => {
    setStep('intro')
    setTopic('')
    setName('')
    setPhone('')
    setRequirement('')
  }

  const handleQuick = (t: string) => {
    setTopic(t)
    setStep('details')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hi Saferx team!\n\nTopic: ${topic}\nName: ${name}\nPhone: ${phone}\nRequirement: ${requirement}`,
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
    setStep('done')
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={cn(
          'fixed bottom-24 right-4 z-50 w-[min(92vw,360px)] origin-bottom-right transition-all duration-300 sm:right-6',
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0',
        )}
        role="dialog"
        aria-label="WhatsApp chat assistant"
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* header */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{COMPANY.short} Assistant</p>
              <p className="text-xs text-white/70">Typically replies in minutes</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-md p-1 text-white/80 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* body */}
          <div className="max-h-[60vh] space-y-3 overflow-y-auto bg-[#ECE5DD] px-4 py-4">
            <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm">
              Hello! Welcome to <strong>Saferx Medical</strong>. How can we help
              you today?
            </div>

            {step === 'intro' && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuick(q)}
                    className="rounded-full border border-[#25D366] bg-white px-3 py-1.5 text-xs font-medium text-[#075E54] transition-colors hover:bg-[#25D366] hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {step === 'details' && (
              <>
                <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3.5 py-2.5 text-sm text-gray-800 shadow-sm">
                  {topic}
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm">
                  Great! Please share a few details and we&apos;ll connect you to
                  our sales team.
                </div>
                <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-[#25D366] focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-[#25D366] focus:outline-none"
                  />
                  <textarea
                    required
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    placeholder="Your requirement"
                    rows={2}
                    className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-[#25D366] focus:outline-none"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setStep('intro')}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-600"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back
                    </button>
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1da851]"
                    >
                      Send to Sales <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 'done' && (
              <>
                <div className="ml-auto flex max-w-[85%] items-center gap-1.5 rounded-xl rounded-tr-sm bg-[#DCF8C6] px-3.5 py-2.5 text-sm text-gray-800 shadow-sm">
                  <Check className="h-4 w-4 text-[#25D366]" /> Request sent
                </div>
                <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm">
                  Thank you, {name || 'there'}! We&apos;ve opened WhatsApp so you
                  can send your message to our sales team.
                </div>
                <button
                  onClick={reset}
                  className="rounded-full border border-[#25D366] bg-white px-3 py-1.5 text-xs font-medium text-[#075E54] hover:bg-[#25D366] hover:text-white"
                >
                  Start over
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-6"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" style={{ animationIterationCount: 3 }} />
        )}
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-8 w-8" />}
      </button>
    </>
  )
}
