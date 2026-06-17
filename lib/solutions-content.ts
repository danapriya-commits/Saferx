import { Activity, Building2, ScanLine, Microscope, Baby, Briefcase, Wrench } from 'lucide-react'

export interface SolutionSection {
  title: string
  items: string[]
}

export interface SolutionDetail {
  slug: string
  title: string
  icon: React.ElementType
  shortDescription: string
  intro: string
  subIntro?: string
  sections: SolutionSection[]
  image: string
}

export const SOLUTIONS_DATA: SolutionDetail[] = [
  {
    slug: 'hospital-infrastructure',
    title: 'Hospital Infrastructure Solutions',
    icon: Building2,
    shortDescription: 'Planning healthcare facilities for today and tomorrow.',
    intro: 'Healthcare infrastructure is more than buildings and equipment. It is about creating environments where technology, clinical teams, and patient care work together effectively.',
    subIntro: 'A successful healthcare project requires careful planning from the earliest stages. Equipment selection, workflow design, utility requirements, networking infrastructure, future expansion capabilities, and maintenance considerations must all be evaluated before implementation begins.\n\nAt Saferx, we support healthcare providers through various stages of facility development and expansion.',
    image: '/images/project-hospital.png',
    sections: [
      {
        title: 'Areas We Support',
        items: [
          'ICU Planning',
          'NICU Development',
          'Diagnostic Centre Setup',
          'Imaging Department Planning',
          'Laboratory Infrastructure',
          'Emergency Department Expansion',
          'Day Care Surgery Centres'
        ]
      }
    ]
  },
  {
    slug: 'icu-critical-care',
    title: 'ICU & Critical Care Solutions',
    icon: Activity,
    shortDescription: 'Supporting critical care teams with reliable technology.',
    intro: 'Critical care environments operate around the clock. Every monitor alarm, ventilator setting, and patient parameter contributes to clinical decision-making.',
    subIntro: 'One of the most common challenges we encounter during ICU projects is balancing clinical requirements with long-term operational sustainability. A system that appears cost-effective today may create service, maintenance, or interoperability challenges in the future.\n\nOur approach is to evaluate equipment from a lifecycle perspective rather than focusing solely on initial acquisition costs.',
    image: '/images/hero-icu.png',
    sections: [
      {
        title: 'Patient Monitoring',
        items: [
          'Multiparameter Patient Monitors',
          'Modular Patient Monitors',
          'Transport Monitors',
          'Central Monitoring Stations',
          'Telemetry Monitoring Systems'
        ]
      },
      {
        title: 'Life Support',
        items: [
          'ICU Ventilators',
          'Transport Ventilators',
          'High Flow Oxygen Therapy Systems',
          'CPAP & BiPAP Systems'
        ]
      },
      {
        title: 'Infusion Therapy',
        items: [
          'Syringe Pumps',
          'Infusion Pumps',
          'Volumetric Pumps'
        ]
      },
      {
        title: 'Emergency & Resuscitation',
        items: [
          'Defibrillators',
          'AED Systems',
          'Crash Cart Equipment',
          'Suction Apparatus'
        ]
      },
      {
        title: 'ICU Accessories',
        items: [
          'Bedside Monitoring Accessories',
          'ECG Cables & Leads',
          'SpO₂ Sensors',
          'NIBP Cuffs',
          'Temperature Probes'
        ]
      }
    ]
  },
  {
    slug: 'diagnostic-imaging',
    title: 'Diagnostic Imaging Solutions',
    icon: ScanLine,
    shortDescription: 'Technology that supports accurate diagnosis.',
    intro: 'Diagnostic imaging is often among the most significant technology investments made by healthcare organizations.',
    subIntro: 'Selecting an imaging system requires more than comparing technical specifications. Patient volume, reporting workflows, clinical specialties, future growth, service support, and technology upgrades all play an important role in determining long-term value.\n\nAt Saferx, we help healthcare providers evaluate imaging technologies within the context of their broader operational objectives.',
    image: '/images/cat-imaging.png',
    sections: [
      {
        title: 'Radiology',
        items: [
          'Digital X-Ray Systems',
          'Fixed X-Ray Systems',
          'Mobile X-Ray Systems',
          'Portable X-Ray Systems'
        ]
      },
      {
        title: 'Ultrasound',
        items: [
          'Colour Doppler Systems',
          'Portable Ultrasound Systems',
          'Women\'s Health Ultrasound Systems',
          'General Imaging Ultrasound Systems'
        ]
      },
      {
        title: 'Surgical Imaging',
        items: [
          'C-Arm Systems',
          'Mobile C-Arm Systems'
        ]
      },
      {
        title: 'Imaging Accessories',
        items: [
          'Lead Protection Equipment',
          'Imaging Workstations',
          'PACS Connectivity Solutions'
        ]
      }
    ]
  },
  {
    slug: 'laboratory-solutions',
    title: 'Laboratory Solutions',
    icon: Microscope,
    shortDescription: 'Reliable technologies for modern diagnostic laboratories.',
    intro: 'Laboratories are under increasing pressure to deliver faster results, maintain quality standards, and manage growing testing volumes.',
    subIntro: 'We often advise laboratories to look beyond analyzer specifications and evaluate the complete operational impact of a technology investment. Factors such as reagent costs, service support, calibration requirements, automation potential, and future scalability can significantly influence overall performance.',
    image: '/images/cat-lab.png',
    sections: [
      {
        title: 'Hematology',
        items: [
          '3-Part Hematology Analyzers',
          '5-Part Hematology Analyzers'
        ]
      },
      {
        title: 'Clinical Chemistry',
        items: [
          'Semi-Auto Biochemistry Analyzers',
          'Fully Automated Biochemistry Analyzers'
        ]
      },
      {
        title: 'Immunology',
        items: [
          'Chemiluminescence Immunoassay Analyzers (CLIA)',
          'ELISA Systems'
        ]
      },
      {
        title: 'Electrolyte Analysis',
        items: [
          'Electrolyte Analyzers'
        ]
      },
      {
        title: 'Urinalysis',
        items: [
          'Urine Analyzers'
        ]
      },
      {
        title: 'Point-of-Care Diagnostics',
        items: [
          'Blood Gas Analyzers',
          'POCT Devices'
        ]
      }
    ]
  },
  {
    slug: 'maternal-neonatal',
    title: 'Maternal & Neonatal Care Solutions',
    icon: Baby,
    shortDescription: 'Supporting mothers, newborns, and clinical teams.',
    intro: 'Maternal and neonatal care environments require specialized technologies designed to support both routine monitoring and critical interventions.',
    subIntro: 'Whether developing a maternity wing, expanding neonatal services, or upgrading monitoring systems, selecting the right technology can significantly influence patient outcomes and staff efficiency.',
    image: '/images/cat-neonatal.png',
    sections: [
      {
        title: 'Obstetrics',
        items: [
          'Fetal Monitors',
          'CTG Machines',
          'Doppler Systems',
          'Labour Monitoring Systems'
        ]
      },
      {
        title: 'Neonatal Care',
        items: [
          'Neonatal Monitors',
          'Neonatal Ventilators',
          'Infant Warmers',
          'Radiant Warmers',
          'Phototherapy Units',
          'Neonatal Resuscitation Equipment'
        ]
      },
      {
        title: 'NICU Solutions',
        items: [
          'Central Monitoring Systems',
          'Neonatal Infusion Pumps',
          'Oxygen Therapy Systems'
        ]
      }
    ]
  },
  {
    slug: 'procurement-advisory',
    title: 'Hospital Procurement Advisory',
    icon: Briefcase,
    shortDescription: 'Helping healthcare organizations make smarter technology investments.',
    intro: 'Many healthcare facilities spend considerable time comparing equipment specifications yet devote less attention to evaluating long-term ownership costs.',
    subIntro: 'In our experience, maintenance expenses, consumables, service response times, training requirements, and future upgrade needs often have a greater impact on total investment value than the purchase price itself.\n\nOur advisory services help organizations evaluate equipment decisions through both clinical and operational lenses.',
    image: '/images/healthcare_hero_bg.png',
    sections: [
      {
        title: 'Advisory Areas',
        items: [
          'Equipment Evaluation',
          'Vendor Assessment',
          'Budget Planning',
          'Technology Roadmaps',
          'Capital Equipment Planning',
          'Replacement Strategies'
        ]
      }
    ]
  },
  {
    slug: 'biomedical-engineering',
    title: 'Biomedical Engineering & Lifecycle Management',
    icon: Wrench,
    shortDescription: 'Maximizing value throughout the equipment lifecycle.',
    intro: 'Medical equipment should be viewed as long-term assets rather than one-time purchases.',
    subIntro: 'We frequently see healthcare organizations face challenges related to aging equipment, maintenance planning, utilization tracking, and replacement decisions.\n\nA structured lifecycle management approach helps organizations improve reliability, reduce downtime, and optimize return on investment.',
    image: '/images/healthcare_hero_bg.png',
    sections: [
      {
        title: 'Areas of Focus',
        items: [
          'Asset Assessment',
          'Preventive Maintenance Planning',
          'Utilization Reviews',
          'Replacement Planning',
          'Compliance Documentation',
          'Lifecycle Optimization'
        ]
      }
    ]
  }
]
