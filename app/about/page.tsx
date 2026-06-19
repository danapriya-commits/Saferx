import { PageHero, SectionHeading } from '@/components/section'
import { CheckCircle, Shield, Heart, Award } from 'lucide-react'
import { EditableText } from '@/components/admin/EditableText'
import { EditableImage } from '@/components/admin/EditableImage'

export const metadata = {
  title: 'About Us | Saferx Medical Supplies',
  description: 'Learn about Saferx, our mission, and the team behind our premium medical equipment solutions.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={<EditableText section="about" fieldKey="hero_title">Pioneering the Future of Healthcare</EditableText>}
        description={<EditableText section="about" fieldKey="hero_description">We are committed to delivering world-class medical equipment and hospital infrastructure to empower healthcare professionals and improve patient outcomes.</EditableText>}
        breadcrumb="About"
        eyebrow={<EditableText section="about" fieldKey="hero_eyebrow">Who We Are</EditableText>}
        backgroundImage="/images/aboutsection.png"
        section="about"
        fieldKey="hero_bg"
      />

      {/* About Us Section */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-[1536px] container-px">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionHeading
                eyebrow={<EditableText section="about" fieldKey="mission_eyebrow">Our Mission</EditableText>}
                title={<EditableText section="about" fieldKey="mission_title">Empowering Care Providers Worldwide</EditableText>}
                description={<EditableText section="about" fieldKey="mission_desc">Since our founding, Saferx has been at the forefront of medical technology distribution. We believe that every healthcare facility, regardless of size, deserves access to reliable, state-of-the-art equipment.</EditableText>}
                className="mb-8"
              />

              <ul className="space-y-4">
                {[
                  { key: "point1", default: 'Over 15 years of industry excellence' },
                  { key: "point2", default: 'Partnered with 500+ top-tier hospitals' },
                  { key: "point3", default: '24/7 dedicated support and maintenance' },
                  { key: "point4", default: 'Certified quality assurance processes' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span><EditableText section="about" fieldKey={`mission_${item.key}`}>{item.default}</EditableText></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl bg-secondary/50 p-6 shadow-sm border border-border/50">
                  <Shield className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2"><EditableText section="about" fieldKey="feat1_title">Uncompromised Safety</EditableText></h3>
                  <p className="text-sm text-muted-foreground"><EditableText section="about" fieldKey="feat1_desc">Every product meets strict international safety standards.</EditableText></p>
                </div>
                <div className="rounded-2xl bg-primary text-primary-foreground p-6 shadow-md">
                  <Heart className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="font-semibold text-lg mb-2"><EditableText section="about" fieldKey="feat2_title">Patient First</EditableText></h3>
                  <p className="text-sm opacity-90"><EditableText section="about" fieldKey="feat2_desc">Designed to enhance patient comfort and recovery.</EditableText></p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-accent text-accent-foreground p-6 shadow-md">
                  <Award className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="font-semibold text-lg mb-2"><EditableText section="about" fieldKey="feat3_title">Award Winning</EditableText></h3>
                  <p className="text-sm opacity-90"><EditableText section="about" fieldKey="feat3_desc">Recognized for excellence in medical supply chain.</EditableText></p>
                </div>
                <div className="rounded-2xl bg-secondary/50 p-6 shadow-sm border border-border/50">
                  <div className="text-4xl font-bold text-primary mb-2"><EditableText section="about" fieldKey="feat4_value">10k+</EditableText></div>
                  <h3 className="font-semibold text-lg mb-2"><EditableText section="about" fieldKey="feat4_title">Installations</EditableText></h3>
                  <p className="text-sm text-muted-foreground"><EditableText section="about" fieldKey="feat4_desc">Successfully deployed across the globe.</EditableText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Director's Message Section */}
      <section className="py-14 sm:py-20 bg-[#e8fafa]">
        <div className="mx-auto max-w-[1536px] container-px">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#0a2f5c] mb-16">
            <EditableText section="about" fieldKey="director_section_title">Founder's Message</EditableText>
          </h2>

          <div className="grid gap-12 lg:grid-cols-[400px_1fr] items-start">
            {/* Image Column */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-[400px]">
              <div className="relative w-full overflow-hidden rounded-sm shadow-md bg-transparent">
                <EditableImage
                  section="about"
                  fieldKey="director_image"
                  defaultSrc="/images/danapic.jpeg"
                  alt="Dana Priya G"
                  width={400}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex gap-4 pl-2 items-center">
                <a href="https://www.linkedin.com/in/danapriyag/" className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#242e3e] text-white transition-all hover:bg-[#324056] hover:scale-105">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
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
              <h3 className="text-xl md:text-2xl font-semibold text-[#0a2f5c] mb-1">
                <EditableText section="about" fieldKey="director_name">Dana Priya G</EditableText>
              </h3>
              <p className="text-base md:text-lg font-medium text-[#0a2f5c] mb-8">
                <EditableText section="about" fieldKey="director_title">Founder</EditableText>
              </p>

              <div className="space-y-6 text-[#4a5568] text-[15px] leading-relaxed font-light text-justify">
                <p>
                  <EditableText section="about" fieldKey="director_p1">Healthcare should not be a privilege determined by geography or affordability. Yet, across India, many healthcare providers continue to face challenges in accessing reliable and cost-effective medical technologies that are essential for timely diagnosis and patient care.</EditableText>
                </p>
                <p>
                  <EditableText section="about" fieldKey="director_p2">Saferx was founded with a simple belief: every healthcare provider, whether located in a metropolitan city or a Tier-3 town, deserves access to dependable healthcare solutions that improve patient outcomes without compromising on quality or affordability.</EditableText>
                </p>
                <p>
                  <EditableText section="about" fieldKey="director_p3">Our journey began with a commitment to bridge the gap between healthcare needs and technology access. Over time, we have expanded our focus from supplying healthcare products to becoming a trusted partner for hospitals, clinics, diagnostic centres, and healthcare entrepreneurs seeking practical, scalable, and sustainable healthcare solutions.</EditableText>
                </p>
                <p>
                  <EditableText section="about" fieldKey="director_p4">At Saferx, we believe that long-term success is built on trust, ethical business practices, and delivering consistent value to our customers and partners. Every solution we offer is guided by our commitment to quality, affordability, and service excellence.</EditableText>
                </p>
                <p>
                  <EditableText section="about" fieldKey="director_p5">As we continue to grow, our goal remains clear: to make essential healthcare technologies more accessible, support better patient care, and contribute meaningfully to the advancement of healthcare across India.</EditableText>
                </p>
                <p>
                  <EditableText section="about" fieldKey="director_p6">Thank you for placing your trust in Saferx. We look forward to partnering with you in building a healthier future.</EditableText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-secondary/30 py-14 sm:py-20 border-t border-border/50">
        <div className="mx-auto max-w-[1536px] container-px">
          <SectionHeading
            center
            eyebrow={<EditableText section="about" fieldKey="team_eyebrow">Our Team</EditableText>}
            title={<EditableText section="about" fieldKey="team_title">Meet the Experts</EditableText>}
            description={<EditableText section="about" fieldKey="team_desc">Our leadership team brings decades of combined experience in healthcare, technology, and global supply chain management.</EditableText>}
            className="mb-16"
          />

          <div className="grid gap-8 sm:grid-cols-2 max-w-6xl mx-auto">
            {[
              {
                id: 'member1',
                name: 'Dana Priya',
                role: 'Founding And Managing Director',
                bio: 'Dana Priya is an Engineering Graduate with a Masters in Business Administration and Entrepreneurship from IIM Lucknow. She initiated her career as a software professional and has transformed to healthcare. She has wide experience working with clients in Europe and USA. She has 20+ years of knowledge in Manufacturing and Service industry with a strong focus towards On Time Delivery and Customer Relationship Management.',
                image: '/images/danapic.jpeg',
              },
              {
                id: 'member2',
                name: 'Mamta Keswani',
                role: 'International Business Head',
                bio: 'Being part of Digital Marketing and an E-Commerce platform, Mamta has traversed for 22 years, building Leadership base and built Sales teams, spanning over countries from India, Malaysia, Singapore, Nepal, Uganda, Tanzania, Kenya and UAE.\n\nHer passion for Human Resources Development specially for the Youth, she has been engaged with Coaching in the Youth in NLP and behavioural skills in various summer programs.\n\nHer passion for travelling, meeting people, building relationships has been an asset for Saferx.',
                image: '/images/mamta-new-400x400.jpg',
              }
            ].map((member, i) => (
              <div key={i} className="group relative rounded-3xl bg-card p-6 shadow-sm border border-border/50 transition-all hover:shadow-md hover:border-primary/20">
                <div className="mb-6 w-full max-w-[280px] mx-auto overflow-hidden rounded-2xl flex justify-center bg-transparent">
                  <EditableImage
                    section="about"
                    fieldKey={`${member.id}_image`}
                    defaultSrc={member.image}
                    alt={member.name}
                    width={400}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  <EditableText section="about" fieldKey={`${member.id}_name`}>{member.name}</EditableText>
                </h3>
                <p className="text-primary font-medium text-sm mt-1 mb-3">
                  <EditableText section="about" fieldKey={`${member.id}_role`}>{member.role}</EditableText>
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  <EditableText section="about" fieldKey={`${member.id}_bio`}>{member.bio}</EditableText>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
