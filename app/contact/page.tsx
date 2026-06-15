import { PageHero, SectionHeading } from '@/components/section'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | SafeRx Medical Supplies',
  description: 'Get in touch with SafeRx for domestic and international enquiries.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        description="Whether you have a domestic enquiry or international requirements, our team is ready to assist you with world-class medical solutions."
        breadcrumb="Contact"
        eyebrow="Contact Us"
        backgroundImage="/images/contactsection.png"
      />

      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        
        <div className="relative mx-auto max-w-[1536px] container-px">
          
          {/* Top Info Section: 3 Columns */}
          <div className="grid gap-8 md:grid-cols-3 mb-20">
            {/* Domestic Enquiry */}
            <div className="group rounded-3xl bg-card p-8 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Domestic Enquiry</h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 9043490435</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> sales@saferxmedical.com</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> danapriya@gmail.com</p>
              </div>
            </div>

            {/* Location */}
            <div className="group rounded-3xl bg-card p-8 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">Location</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>D.No.9/24, Irugur Main Road,</p>
                <p>Irugur, Coimbatore-641103,</p>
                <p>Tamil Nadu, India</p>
              </div>
            </div>

            {/* International Enquiry */}
            <div className="group rounded-3xl bg-card p-8 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground">International Enquiry</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0" /> 4001, Blue tower<br/>Sheikh Zayed Road, Dubai</p>
                <p className="flex items-center gap-2 mt-4"><Mail className="h-4 w-4 shrink-0" /> intlsales@saferxmedical.com</p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Form + Map */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            
            {/* Contact Form */}
            <div className="rounded-3xl bg-card p-8 shadow-lg border border-border/50">
              <SectionHeading
                title="Mail Us!!!"
                className="mb-8"
              />
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" placeholder="John Doe" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Your email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Your Number</Label>
                  <Input id="number" type="tel" placeholder="+1 (555) 000-0000" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Your message (optional)</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your requirements..." 
                    className="min-h-[120px] bg-background/50" 
                  />
                </div>
                <Button type="button" className="w-full text-base h-12">
                  Submit
                </Button>
              </form>
            </div>

            {/* Google Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border/50 h-full min-h-[400px] lg:min-h-full relative bg-muted group">
              <iframe 
                src="https://maps.google.com/maps?q=Saferx%20Medical%20Supplies%20Private%20Limited,%20Irugur,%20Coimbatore&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Clickable Overlay */}
              <a 
                href="http://google.com/maps/place/Saferx+Medical+Supplies+Private+Limited/@11.0103955,77.0635075,814m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba857518e4a4903:0x13e799f78c66448b!8m2!3d11.0103902!4d77.0660824!16s%2Fg%2F11jbhzkjq7?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/20"
                aria-label="Open in Google Maps"
              >
                <div className="rounded-full bg-primary p-4 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100 shadow-xl">
                  <ExternalLink className="h-6 w-6" />
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
