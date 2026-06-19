'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', number: '', message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', number: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {status === 'success' && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm border border-green-200">
          Thank you! Your feedback has been sent successfully. We will get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
          Failed to send message. Please try again later.
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" className="bg-background/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Your email</Label>
        <Input id="email" type="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" className="bg-background/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" required value={formData.subject} onChange={handleChange} placeholder="How can we help?" className="bg-background/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Your Number</Label>
        <Input id="number" type="tel" required value={formData.number} onChange={handleChange} placeholder="+1 (555) 000-0000" className="bg-background/50" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Your message (optional)</Label>
        <Textarea 
          id="message" 
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..." 
          className="min-h-[120px] bg-background/50" 
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full text-base h-12">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit'}
      </Button>
    </form>
  )
}
