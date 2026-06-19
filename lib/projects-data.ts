import { Activity, ScanLine, Microscope, Baby, Building2, Wrench } from 'lucide-react'

export interface ProjectData {
  slug: string
  title: string
  category: string
  location: string
  clientType: string
  completionYear: string
  image: string
  stat: string // For the homepage preview card
  shortDesc: string // For the homepage preview card
  
  // Detailed Page Data
  requirements: string
  solutions: string
  scope: string[]
  equipmentImplemented: string[]
  impact: string[]
}

export const PROJECTS: ProjectData[] = [
  {
    slug: 'apollo-icu-setup',
    title: 'Apollo Speciality Hospital — ICU Setup',
    category: 'ICU & Critical Care',
    location: 'Bengaluru, India',
    clientType: 'Multi-Specialty Hospital',
    completionYear: '2025',
    image: '/images/project-hospital.png',
    stat: '120-bed multi-specialty facility',
    shortDesc: 'Complete turnkey ICU, operation theatre and patient monitoring deployment delivered in 14 weeks.',
    
    requirements: 'The hospital needed a rapid, state-of-the-art ICU expansion to handle increased critical care admissions. The key challenges included a tight 14-week timeline, integration with existing hospital information systems, and ensuring the highest standards of infection control and patient safety.',
    solutions: 'Saferx provided an end-to-end turnkey solution, managing everything from initial spatial planning to final commissioning. We deployed a dedicated biomedical engineering team on-site to coordinate with hospital architects, ensuring that gas pipelines, electrical layouts, and equipment footprints were perfectly aligned.',
    scope: [
      'Site Assessment & Spatial Planning',
      'Medical Equipment Procurement',
      'Installation & Calibration',
      'Clinical Staff Training',
      'Comprehensive AMC Setup'
    ],
    equipmentImplemented: [
      'High-end Patient Monitors with Central Station',
      'Advanced ICU Ventilators',
      'Syringe & Volumetric Infusion Pumps',
      'Biphasic Defibrillators',
      'ABG Analyzers'
    ],
    impact: [
      'Project delivered 2 weeks ahead of schedule',
      'Seamless integration with existing hospital network',
      'Zero downtime during critical transition phases',
      'Improved workflow efficiency by 30%'
    ]
  },
  {
    slug: 'meridian-diagnostic-center',
    title: 'Meridian Diagnostic Center',
    category: 'Diagnostic Centre Setup',
    location: 'Hyderabad, India',
    clientType: 'Standalone Diagnostic Hub',
    completionYear: '2024',
    image: '/images/project-diagnostic.png',
    stat: 'CT, MRI & full lab automation',
    shortDesc: 'End-to-end imaging and laboratory setup with installation, calibration and staff training.',
    
    requirements: 'Meridian required a complete, ground-up setup of a high-throughput diagnostic center capable of handling over 500 patients daily. The facility needed advanced imaging modalities alongside a fully automated clinical laboratory, all operating under a unified LIS/PACS system.',
    solutions: 'We acted as the primary technology consultant, advising on the optimal mix of imaging and IVD equipment to maximize ROI. We handled the complex logistics of MRI and CT scanner delivery and installation, including RF shielding verification and regulatory compliance documentation.',
    scope: [
      'Technology Planning & ROI Analysis',
      'Imaging Room Shielding Verification',
      'Equipment Installation & Commissioning',
      'AERB Compliance Support',
      'Application Training for Technicians'
    ],
    equipmentImplemented: [
      '1.5T MRI System',
      '128-Slice CT Scanner',
      'Digital Radiography (X-Ray)',
      'High-End Color Doppler Ultrasound',
      'Fully Automated Biochemistry & CLIA Analyzers'
    ],
    impact: [
      'Achieved a 40% faster report turnaround time',
      'Successfully cleared all AERB and NABL audits on first attempt',
      'Highly optimized floor plan reducing patient wait times',
      'Consistent 99.9% equipment uptime over 2 years'
    ]
  },
  {
    slug: 'sunrise-capacity-expansion',
    title: 'Sunrise Hospital — Capacity Expansion',
    category: 'Hospital Expansion Projects',
    location: 'Pune, India',
    clientType: 'Tertiary Care Hospital',
    completionYear: '2025',
    image: '/images/cat-imaging.png',
    stat: '+80 critical-care beds',
    shortDesc: 'Phased expansion adding NICU, cardiology and additional ICU capacity with zero downtime.',
    
    requirements: 'Sunrise Hospital was undergoing a major expansion while remaining fully operational. They required 80 new critical care beds, including a specialized Level III NICU and a new Cath Lab, without disrupting ongoing patient care in adjacent wings.',
    solutions: 'Saferx developed a phased deployment strategy. We worked during off-peak hours and utilized modular installation techniques to minimize noise and disruption. We also standardized the monitoring equipment across the new and old wings to simplify staff cross-training.',
    scope: [
      'Phased Deployment Strategy',
      'Standardization of Fleet Equipment',
      'Cath Lab Infrastructure Preparation',
      'NICU Environment Control Planning',
      'Biomedical Workflow Integration'
    ],
    equipmentImplemented: [
      'Neonatal Incubators & Open Care Warmers',
      'Fetal Monitors & CTG Machines',
      'Flat Panel Cath Lab System',
      'Intra-Aortic Balloon Pump (IABP)',
      'Mobile C-Arm System'
    ],
    impact: [
      'Zero disruption to existing hospital operations',
      'Reduced cross-training time due to equipment standardization',
      'Elevated NICU to Level III capabilities',
      'Future-ready infrastructure to support further expansion'
    ]
  }
]
