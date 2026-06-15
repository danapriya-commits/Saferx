import { PageHero, SectionHeading } from '@/components/section'
import { CheckCircle, Shield, Heart, Award } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: 'About Us | SafeRx Medical Supplies',
  description: 'Learn about SafeRx, our mission, and the team behind our premium medical equipment solutions.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Pioneering the Future of Healthcare"
        description="We are committed to delivering world-class medical equipment and hospital infrastructure to empower healthcare professionals and improve patient outcomes."
        breadcrumb="About"
        eyebrow="Who We Are"
        backgroundImage="/images/aboutsection.png"
      />

      {/* About Us Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow="Our Mission"
                title="Empowering Care Providers Worldwide"
                description="Since our founding, SafeRx has been at the forefront of medical technology distribution. We believe that every healthcare facility, regardless of size, deserves access to reliable, state-of-the-art equipment."
                className="mb-8"
              />
              
              <ul className="space-y-4">
                {[
                  'Over 15 years of industry excellence',
                  'Partnered with 500+ top-tier hospitals',
                  '24/7 dedicated support and maintenance',
                  'Certified quality assurance processes'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl bg-secondary/50 p-6 shadow-sm border border-border/50">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Uncompromised Safety</h3>
                  <p className="text-sm text-muted-foreground">Every product meets strict international safety standards.</p>
                </div>
                <div className="rounded-2xl bg-primary text-primary-foreground p-6 shadow-md">
                  <Heart className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="font-semibold text-lg mb-2">Patient First</h3>
                  <p className="text-sm opacity-90">Designed to enhance patient comfort and recovery.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-accent text-accent-foreground p-6 shadow-md">
                  <Award className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="font-semibold text-lg mb-2">Award Winning</h3>
                  <p className="text-sm opacity-90">Recognized for excellence in medical supply chain.</p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-6 shadow-sm border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                  <h3 className="font-semibold text-lg mb-2">Installations</h3>
                  <p className="text-sm text-muted-foreground">Successfully deployed across the globe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="py-20 sm:py-32 bg-[#e8fafa]">
        <div className="mx-auto max-w-[1536px] container-px">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a2f5c] mb-16">
            Director's Message
          </h2>
          
          <div className="grid gap-12 lg:grid-cols-[400px_1fr] items-start">
            {/* Image Column */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-[400px]">
              <div className="relative aspect-square md:aspect-[4/5] w-full overflow-hidden rounded-sm shadow-md">
                <Image
                  src="/images/Dana Priya.jpg"
                  alt="G. Dana Priya"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex gap-4 pl-2 items-center">
                <a href="https://www.linkedin.com/in/danapriyag/" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#242e3e] text-white transition-all hover:bg-[#324056] hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>
                  </svg>
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=danapriya@saferxmedical.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#242e3e] text-white transition-all hover:bg-[#324056] hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Text Column */}
            <div className="pt-2">
              <h3 className="text-xl md:text-2xl font-semibold text-[#0a2f5c] mb-1">G. Dana Priya</h3>
              <p className="text-base md:text-lg font-medium text-[#0a2f5c] mb-8">Managing Director</p>
              
              <div className="space-y-6 text-[#4a5568] text-[15px] leading-relaxed font-light text-justify">
                <p>
                  Our vision is to revolutionize healthcare by making high-quality healthcare products more accessible and affordable to all. We envision a future where individuals from all walks of life can access essential healthcare products without financial barriers. Through innovation, collaboration, and a relentless commitment to quality, we aim to redefine industry standards, ensuring that our products meet the highest standards of efficacy, safety, and affordability. Together, we are working towards a world where everyone can enjoy better health and well-being through access to the healthcare products they need.
                </p>
                <p>
                  Our company was established in 2020, specializing in medical disposables. By 2022, we expanded our portfolio to include Pharmaceuticals, followed by entry into Nutraceuticals and Chemicals in 2023.
                </p>
                <p>
                  The journey of Saferx is ongoing, fueled by the steadfast support of our clients and team. With this support, we are confident in our ability to continually achieve milestones of excellence in the years ahead. Our goal is to become the most reliable supplier, providing top-quality products to over 500 customers worldwide by 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-secondary/30 py-20 sm:py-32 border-t border-border/50">
        <div className="mx-auto max-w-[1536px] container-px">
          <SectionHeading
            center
            eyebrow="Our Team"
            title="Meet the Experts"
            description="Our leadership team brings decades of combined experience in healthcare, technology, and global supply chain management."
            className="mb-16"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Dana Priya',
                role: 'Founding And Managing Director',
                bio: 'Dana Priya is an Engineering Graduate with a Masters in Business Administration. She initiated her career as a software professional and has wide experience working with clients in Europe and USA. She has 20 years of knowledge in Manufacturing and Service industry with a strong focus towards On Time Delivery and Customer Relationship Management.',
                image: '/images/Dana Priya.jpg',
              },
              {
                name: 'Mamta Keswani',
                role: 'International Business Head',
                bio: 'Being part of Digital Marketing and an E-Commerce platform, Mamta has traversed for 22 years, building Leadership base and built Sales teams, spanning over countries from India, Malaysia, Singapore, Nepal, Uganda, Tanzania, Kenya and UAE.\n\nHer passion for Human Resources Development specially for the Youth, she has been engaged with Coaching in the Youth in NLP and behavioural skills in various summer programs.\n\nHer passion for travelling, meeting people, building relationships has been an asset for Saferx.',
                image: '/images/mamta-new-400x400.jpg',
              },
              {
                name: 'Suganya Suresh',
                role: 'Marketing Executive',
                bio: 'S. Suganya is an graduate in B. Com CA and holds post graduate diploma in Computer Applications as well. Being proficient in accounting and finance related fields, she also holds knowledge in data analysis and marketing fields. She have a adaptive mindset, ready-to-do personality and can easily interpret the customer needs to provide a accurate solution. Her confidence and keen interest towards technological, corporate relations and entrepreneurial aspects keeps her distinct.',
                image: '/images/Suganya Suresh.png',
              }
            ].map((member, i) => (
              <div key={i} className="group relative rounded-3xl bg-card p-6 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
                <div className="mb-6 aspect-square overflow-hidden rounded-2xl bg-secondary relative">
                  {member.image ? (
                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary/20">{member.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary font-medium text-sm mt-1 mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
