import {
  Activity,
  Stethoscope,
  Microscope,
  Baby,
  Building2,
  Wrench,
  HeartPulse,
  ScanLine,
  MonitorSmartphone,
  FlaskConical,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Medical Equipment', href: '/equipment' },
  { label: 'Projects', href: '/projects' },
  { label: 'Knowledge Center', href: '/knowledge-center' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const SOLUTIONS = [
  {
    title: 'ICU & Critical Care',
    slug: 'icu-critical-care',
    icon: Activity,
    desc: 'Ventilators, monitors and life-support systems engineered for the most demanding critical-care environments.',
  },
  {
    title: 'Diagnostic Imaging',
    slug: 'diagnostic-imaging',
    icon: ScanLine,
    desc: 'CT, MRI, X-ray and ultrasound platforms with installation, calibration and ongoing support.',
  },
  {
    title: 'Laboratory Solutions',
    slug: 'laboratory-solutions',
    icon: Microscope,
    desc: 'Fully integrated lab automation, analyzers and sample-management workflows for high throughput.',
  },
  {
    title: 'Mother & Child Care',
    slug: 'mother-child-care',
    icon: Baby,
    desc: 'Neonatal warmers, incubators and maternal monitoring designed for the safest beginnings.',
  },
  {
    title: 'Hospital Infrastructure',
    slug: 'hospital-infrastructure',
    icon: Building2,
    desc: 'Modular operation theatres, ICUs and medical gas pipelines built to international standards.',
  },
  {
    title: 'Biomedical Services',
    slug: 'biomedical-services',
    icon: Wrench,
    desc: 'AMC, calibration, preventive maintenance and 24/7 technical support across your equipment fleet.',
  },
]

export const EQUIPMENT_CATEGORIES = [
  {
    title: 'Patient Monitoring',
    slug: 'patient-monitoring',
    icon: MonitorSmartphone,
    image: '/images/cat-monitoring.png',
    desc: 'Multi-parameter monitors, central stations and telemetry systems for every care level.',
  },
  {
    title: 'Imaging Systems',
    slug: 'imaging-systems',
    icon: ScanLine,
    image: '/images/cat-imaging.png',
    desc: 'Advanced CT, MRI, digital X-ray and ultrasound platforms from leading manufacturers.',
  },
  {
    title: 'Laboratory Equipment',
    slug: 'laboratory-equipment',
    icon: FlaskConical,
    image: '/images/cat-lab.png',
    desc: 'Hematology, biochemistry and immunoassay analyzers with full automation options.',
  },
  {
    title: 'Cardiology Equipment',
    slug: 'cardiology-equipment',
    icon: HeartPulse,
    image: '/images/cat-cardiology.png',
    desc: 'ECG systems, defibrillators, cath-lab and cardiac monitoring technology.',
  },
  {
    title: 'Neonatal Equipment',
    slug: 'neonatal-equipment',
    icon: Baby,
    image: '/images/cat-neonatal.png',
    desc: 'Incubators, radiant warmers, phototherapy and resuscitation systems for NICUs.',
  },
  {
    title: 'Critical Care',
    slug: 'critical-care',
    icon: Stethoscope,
    image: '/images/hero-icu.png',
    desc: 'Ventilators, infusion systems and complete ICU bedside solutions.',
  },
]

export const MEGA_MENU = [
  {
    heading: 'Solutions',
    items: [
      { label: 'ICU & Critical Care', href: '/solutions#icu-critical-care' },
      { label: 'Diagnostic Imaging', href: '/solutions#diagnostic-imaging' },
      { label: 'Laboratory Solutions', href: '/solutions#laboratory-solutions' },
      { label: 'Mother & Child Care', href: '/solutions#mother-child-care' },
      { label: 'Hospital Infrastructure', href: '/solutions#hospital-infrastructure' },
    ],
  },
  {
    heading: 'Medical Equipment',
    items: [
      { label: 'Monitoring', href: '/equipment#patient-monitoring' },
      { label: 'Imaging', href: '/equipment#imaging-systems' },
      { label: 'Laboratory', href: '/equipment#laboratory-equipment' },
      { label: 'Cardiology', href: '/equipment#cardiology-equipment' },
      { label: 'Neonatal', href: '/equipment#neonatal-equipment' },
    ],
  },
  {
    heading: 'Projects',
    items: [
      { label: 'Hospital Setup', href: '/projects#hospital-setup' },
      { label: 'Diagnostic Centers', href: '/projects#diagnostic-centers' },
      { label: 'Expansion Projects', href: '/projects#expansion-projects' },
    ],
  },
]

export const PROJECTS = [
  {
    title: 'Apollo Speciality Hospital — ICU Setup',
    category: 'Hospital Setup',
    slug: 'hospital-setup',
    image: '/images/project-hospital.png',
    location: 'Bengaluru, India',
    stat: '120-bed multi-specialty facility',
    desc: 'Complete turnkey ICU, operation theatre and patient monitoring deployment delivered in 14 weeks.',
  },
  {
    title: 'Meridian Diagnostic Center',
    category: 'Diagnostic Centers',
    slug: 'diagnostic-centers',
    image: '/images/project-diagnostic.png',
    location: 'Hyderabad, India',
    stat: 'CT, MRI & full lab automation',
    desc: 'End-to-end imaging and laboratory setup with installation, calibration and staff training.',
  },
  {
    title: 'Sunrise Hospital — Capacity Expansion',
    category: 'Expansion Projects',
    slug: 'expansion-projects',
    image: '/images/cat-imaging.png',
    location: 'Pune, India',
    stat: '+80 critical-care beds',
    desc: 'Phased expansion adding NICU, cardiology and additional ICU capacity with zero downtime.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'SAFERX delivered our entire ICU setup ahead of schedule. Their biomedical team is responsive and the equipment quality is outstanding.',
    name: 'Dr. Anita Rao',
    role: 'Medical Director, Apollo Speciality',
    rating: 5,
  },
  {
    quote:
      'From procurement to installation and AMC, the experience has been seamless. They truly understand hospital operations.',
    name: 'Rajesh Kumar',
    role: 'Procurement Head, Meridian Group',
    rating: 5,
  },
  {
    quote:
      'Reliable, compliant and always available. Our diagnostic uptime improved significantly after partnering with SAFERX.',
    name: 'Dr. Vikram Shah',
    role: 'Chief Radiologist, Sunrise Hospital',
    rating: 5,
  },
]

export const CERTIFICATIONS = [
  'ISO 9001:2015',
  'ISO 13485',
  'CDSCO Registered',
  'CE Certified',
  'Authorized Distributor',
  'WHO-GMP',
]

export const BLOG_POSTS = [
  {
    slug: 'future-of-hospital-monitoring',
    title: 'The Future of Connected Patient Monitoring in Indian Hospitals',
    excerpt:
      'How centralised monitoring and IoT-enabled devices are transforming critical care delivery and patient outcomes.',
    image: '/images/blog-1.png',
    category: 'Healthcare Technology',
    date: 'May 28, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'planning-a-modular-operation-theatre',
    title: 'A Practical Guide to Planning a Modular Operation Theatre',
    excerpt:
      'Key considerations for airflow, infection control and equipment integration when designing modern OTs.',
    image: '/images/blog-2.png',
    category: 'Hospital Planning',
    date: 'May 14, 2026',
    readTime: '8 min read',
  },
  {
    slug: 'why-amc-matters-for-medical-equipment',
    title: 'Why a Strong AMC Strategy Protects Your Equipment Investment',
    excerpt:
      'Preventive maintenance reduces downtime and extends the life of high-value medical assets. Here is how.',
    image: '/images/blog-3.png',
    category: 'Medical Equipment Guides',
    date: 'Apr 30, 2026',
    readTime: '5 min read',
  },
]

export const WHATSAPP_NUMBER = '919000000000'

export const COMPANY = {
  name: 'Dataprox360',
  short: 'Dataprox360',
  phone: '+91 9043490435',
  email: 'sales@saferxmedical.com',
  address: 'D.No.9/24, Irugur Main Road, Irugur, Coimbatore-641103, Tamil Nadu, India',
}
