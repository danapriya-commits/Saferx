import { PageHero, SectionHeading } from '@/components/section'
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { ContactForm } from '@/components/contact-form'

export const metadata = {
  title: 'Contact Us | Saferx Medical Supplies',
  description: 'Get in touch with Saferx for domestic and international enquiries.',
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={<EditableText section="contact" fieldKey="hero_title">Get in Touch</EditableText>}
        description={<EditableText section="contact" fieldKey="hero_description">Whether you have a domestic enquiry or international requirements, our team is ready to assist you with world-class medical solutions.</EditableText>}
        breadcrumb="Contact"
        eyebrow={<EditableText section="contact" fieldKey="hero_eyebrow">Contact Us</EditableText>}
        backgroundImage="/images/contactsection.png"
      />

      <section className="py-14 sm:py-20 relative overflow-hidden">
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
              <h3 className="mb-4 text-xl font-semibold text-foreground"><EditableText section="contact" fieldKey="domestic_title">Domestic Enquiry</EditableText></h3>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> <EditableText section="contact" fieldKey="domestic_phone">+91  7845555955</EditableText></p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> <EditableText section="contact" fieldKey="domestic_email1">sales@saferxmedical.com</EditableText></p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> <EditableText section="contact" fieldKey="domestic_email2">danapriya@gmail.com</EditableText></p>
              </div>
            </div>

            {/* Location */}
            <div className="group rounded-3xl bg-card p-8 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground"><EditableText section="contact" fieldKey="location_title">Location</EditableText></h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p><EditableText section="contact" fieldKey="location_line1">D.No.9/24, Irugur Main Road,</EditableText></p>
                <p><EditableText section="contact" fieldKey="location_line2">Irugur, Coimbatore-641103,</EditableText></p>
                <p><EditableText section="contact" fieldKey="location_line3">Tamil Nadu, India</EditableText></p>
              </div>
            </div>

            {/* International Enquiry */}
            <div className="group rounded-3xl bg-card p-8 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-foreground"><EditableText section="contact" fieldKey="intl_title">International Enquiry</EditableText></h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-1 shrink-0" /> <EditableText section="contact" fieldKey="intl_address">4001, Blue tower Dubai</EditableText></p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <EditableText section="contact" fieldKey="intl_phone">7010539681</EditableText></p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> <EditableText section="contact" fieldKey="intl_email2">danapriya@saferxmedical.com</EditableText></p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Form + Map */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">

            {/* Contact Form */}
            <div className="rounded-3xl bg-card p-8 shadow-lg border border-border/50">
              <SectionHeading
                title={<EditableText section="contact" fieldKey="form_title">Mail Us!!!</EditableText>}
                className="mb-8"
              />
              <ContactForm />
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
                aria-label="Open in Google Maps "
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
