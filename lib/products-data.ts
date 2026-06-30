import {
  Activity,
  ScanLine,
  Microscope,
  Baby,
  Building2,
  HeartPulse,
  Syringe,
  Wind,
  ShieldCheck,
  Zap,
  Radio
} from 'lucide-react'

export type SolutionCategory = string

export interface ProductFeature {
  icon: React.ElementType
  text: string
}

export interface Product {
  id: string
  name: string
  category: SolutionCategory
  description: string
  image: string
  features: ProductFeature[]
  department: string
  // New fields for the detailed modal
  technicalSpecs: string[]
  benefits: string[]
  installationSupport: string
}

export const CATEGORIES: { name: SolutionCategory; icon: React.ElementType }[] = [
  { name: 'ICU & Critical Care', icon: Activity },
  { name: 'Diagnostic Imaging', icon: ScanLine },
  { name: 'Laboratory', icon: Microscope },
  { name: 'Maternal & Neonatal', icon: Baby },
  { name: 'Hospital Infrastructure', icon: Building2 },
]

export const PRODUCTS: Product[] = [
  // ICU & Critical Care Solutions
  {
    id: 'pt-monitor',
    name: 'Multiparameter Patient Monitors',
    category: 'ICU & Critical Care',
    description: 'Advanced bedside monitors providing continuous, high-accuracy tracking of vital signs including ECG, SpO2, NIBP, and capnography.',
    image: '/images/hero-icu.png',
    department: 'Intensive Care Unit',
    features: [
      { icon: HeartPulse, text: 'Real-time Arrhythmia Analysis' },
      { icon: Zap, text: '12-lead ECG Capabilities' },
      { icon: ShieldCheck, text: 'Seamless EHR Integration' }
    ],
    technicalSpecs: [
      'Screen Size: 12.1" to 15.6" TFT Touch Display',
      'Battery Backup: Up to 4 hours continuous monitoring',
      'Parameters: ECG, RESP, SpO2, NIBP, 2-TEMP, PR',
      'Optional: IBP, EtCO2, Cardiac Output'
    ],
    benefits: [
      'Reduces alarm fatigue with intelligent alerting',
      'Seamlessly integrates into central monitoring stations',
      'Intuitive touchscreen interface reduces training time'
    ],
    installationSupport: 'Includes standard wall-mount or trolley installation, comprehensive clinical application training, and 1-year comprehensive warranty with 24/7 technical support.'
  },
  {
    id: 'icu-ventilator',
    name: 'Advanced ICU Ventilators',
    category: 'ICU & Critical Care',
    description: 'Invasive and non-invasive ventilation systems with intelligent modes to support adult, pediatric, and neonatal patients.',
    image: '/images/hero-icu.png',
    department: 'Intensive Care Unit',
    features: [
      { icon: Wind, text: 'Adaptive Support Ventilation' },
      { icon: Activity, text: 'Comprehensive Lung Mechanics' },
      { icon: ShieldCheck, text: 'Advanced Alarm Management' }
    ],
    technicalSpecs: [
      'Patient Types: Adult, Pediatric, Neonatal',
      'Ventilation Modes: VCV, PCV, SIMV, CPAP/PSV, APRV, PRVC',
      'Tidal Volume Range: 2ml to 2000ml',
      'Display: 15" capacitive touch screen with 360-degree rotation'
    ],
    benefits: [
      'Optimizes patient-ventilator synchrony',
      'Helps accelerate weaning protocols safely',
      'Built-in nebulizer and high-flow oxygen therapy functions'
    ],
    installationSupport: 'Complete setup including air/O2 pipeline integration, biomedical calibration, and rigorous on-site clinical training for respiratory therapists.'
  },
  {
    id: 'defibrillators',
    name: 'Biphasic Defibrillators',
    category: 'ICU & Critical Care',
    description: 'Reliable, fast-charging biphasic defibrillators equipped with AED, pacing, and comprehensive monitoring functions.',
    image: '/images/cat-cardiology.png',
    department: 'Emergency & Critical Care',
    features: [
      { icon: Zap, text: 'Rapid Charge Technology' },
      { icon: HeartPulse, text: 'Integrated Pacing' },
      { icon: ShieldCheck, text: 'Automated Self-Tests' }
    ],
    technicalSpecs: [
      'Waveform: Biphasic Truncated Exponential',
      'Energy Range: 1J to 360J',
      'Charge Time: Less than 5 seconds to 360J',
      'Battery: Minimum 100 shocks at maximum energy'
    ],
    benefits: [
      'Ready to use immediately in critical emergencies',
      'Multifunctional design replaces the need for separate monitors in transport',
      'Highly portable and durable for pre-hospital environments'
    ],
    installationSupport: 'Delivered ready-to-use with battery conditioning, CPR feedback calibration, and staff in-service training.'
  },
  {
    id: 'infusion-pumps',
    name: 'Volumetric Infusion Pumps',
    category: 'ICU & Critical Care',
    description: 'High-precision medication delivery systems with extensive drug libraries and rigorous safety protocols.',
    image: '/images/hero-icu.png',
    department: 'Critical Care / Wards',
    features: [
      { icon: Syringe, text: 'Anti-Free Flow System' },
      { icon: Zap, text: 'Dynamic Pressure Monitoring' },
      { icon: ShieldCheck, text: 'Extensive Drug Library' }
    ],
    technicalSpecs: [
      'Flow Rate Range: 0.1 ml/h to 1200 ml/h',
      'Accuracy: ± 5%',
      'Occlusion Levels: 3 adjustable levels',
      'Drug Library: Over 2,000 standard medications with dose limits'
    ],
    benefits: [
      'Dramatically reduces medication errors with dose error reduction systems (DERS)',
      'Stackable design saves valuable bedside space',
      'Compatible with standard IV sets to lower recurring costs'
    ],
    installationSupport: 'We assist with custom drug library configuration based on your hospital formulary and provide comprehensive nursing staff training.'
  },

  // Diagnostic Imaging Solutions
  {
    id: 'digital-xray',
    name: 'Digital X-Ray Systems',
    category: 'Diagnostic Imaging',
    description: 'High-frequency digital radiography systems offering exceptional image quality at lower radiation doses.',
    image: '/images/cat-imaging.png',
    department: 'Radiology',
    features: [
      { icon: ScanLine, text: 'High-Resolution Flat Panel' },
      { icon: Zap, text: 'Auto-Exposure Control' },
      { icon: ShieldCheck, text: 'Dose Management' }
    ],
    technicalSpecs: [
      'Generator Power: 32kW / 40kW / 50kW / 80kW options',
      'Detector: Amorphous Silicon with Csl Scintillator',
      'Tube Support: Ceiling suspended or floor-to-ceiling mounted',
      'Table: 4-way or 6-way floating top with elevating options'
    ],
    benefits: [
      'Immediate image availability significantly improves patient throughput',
      'Reduces patient radiation dose while maintaining diagnostic clarity',
      'Automated positioning eliminates manual errors'
    ],
    installationSupport: 'Full turnkey installation including site planning (AERB compliance), lead shielding evaluation, mechanical installation, and application training.'
  },
  {
    id: 'color-doppler',
    name: 'Color Doppler Ultrasound',
    category: 'Diagnostic Imaging',
    description: 'Premium ultrasound platforms delivering extraordinary resolution for cardiology, obstetrics, and general imaging.',
    image: '/images/cat-imaging.png',
    department: 'Radiology / Cardiology',
    features: [
      { icon: Radio, text: 'Elastography Imaging' },
      { icon: Activity, text: 'Advanced 3D/4D Visualization' },
      { icon: ShieldCheck, text: 'Ergonomic Workflow' }
    ],
    technicalSpecs: [
      'Architecture: High-channel count digital beamformer',
      'Transducers: Convex, Linear, Phased Array, Endocavity, 4D Volume',
      'Display: 21" to 24" High-resolution OLED/LED monitor',
      'Advanced Tools: Auto IMT, Tissue Doppler, Strain Elastography'
    ],
    benefits: [
      'Provides confident diagnoses across multiple clinical specialties',
      'Ergonomic design reduces sonographer fatigue and injury',
      'AI-assisted measurements speed up routine exams'
    ],
    installationSupport: 'Includes secure delivery, probe calibration, DICOM configuration with your PACS/HIS, and specialized application training by experienced sonographers.'
  },
  {
    id: 'c-arm',
    name: 'Surgical C-Arm Systems',
    category: 'Diagnostic Imaging',
    description: 'Mobile fluoroscopy systems providing high-contrast intraoperative imaging for orthopedic and cardiovascular procedures.',
    image: '/images/cat-imaging.png',
    department: 'Operation Theatre',
    features: [
      { icon: ScanLine, text: 'Pulsed Fluoroscopy' },
      { icon: Zap, text: 'Laser Targeting' },
      { icon: ShieldCheck, text: 'Thermal Management' }
    ],
    technicalSpecs: [
      'Detector: 9" or 12" Image Intensifier / Flat Panel Detector',
      'Generator: High-frequency monoblock (3.5kW to 15kW)',
      'Movement: Fully counterbalanced with extensive orbital rotation',
      'Storage: Over 100,000 images onboard'
    ],
    benefits: [
      'Enhances surgical precision for complex orthopedic and vascular interventions',
      'Compact footprint easily maneuvers in crowded operating rooms',
      'Advanced cooling allows for continuous imaging during long procedures'
    ],
    installationSupport: 'On-site assembly, radiation safety check, integration with surgical monitors, and scrub-team positioning training.'
  },

  // Laboratory Solutions
  {
    id: 'hematology-analyzer',
    name: '5-Part Hematology Analyzers',
    category: 'Laboratory',
    description: 'Fully automated cell counters providing precise differentials and morphological analysis for high-throughput labs.',
    image: '/images/cat-lab.png',
    department: 'Pathology',
    features: [
      { icon: Microscope, text: 'Laser Flow Cytometry' },
      { icon: Activity, text: '60+ Samples per Hour' },
      { icon: ShieldCheck, text: 'Closed Tube Sampling' }
    ],
    technicalSpecs: [
      'Throughput: 60 to 90 samples per hour',
      'Parameters: 29 reportable parameters including 5-part WBC diff',
      'Sample Volume: Minimum 15 µL (pediatric friendly)',
      'Methodology: Tri-angle laser scatter + chemical dye'
    ],
    benefits: [
      'Drastically reduces manual slide review rates',
      'Accurate flagging of abnormal cells improves diagnostic confidence',
      'Low reagent consumption ensures cost-effective operations'
    ],
    installationSupport: 'Includes analyzer setup, baseline calibration, LIS (Laboratory Information System) interfacing, and comprehensive QC training.'
  },
  {
    id: 'biochemistry-analyzer',
    name: 'Fully Automated Biochemistry Analyzers',
    category: 'Laboratory',
    description: 'Robust clinical chemistry systems designed for operational efficiency, broad testing menus, and minimized reagent waste.',
    image: '/images/cat-lab.png',
    department: 'Clinical Chemistry',
    features: [
      { icon: Zap, text: 'Continuous Loading' },
      { icon: Syringe, text: 'Liquid Level Detection' },
      { icon: ShieldCheck, text: 'Onboard Refrigeration' }
    ],
    technicalSpecs: [
      'Throughput: 200 to 800 photometric tests per hour',
      'Cuvette: Semi-permanent or permanent hard glass',
      'Sample Capacity: Up to 100 positions with continuous loading',
      'ISE Module: Optional Na, K, Cl module available'
    ],
    benefits: [
      'Walkaway automation reduces technician hands-on time',
      'High-precision pipetting ensures exceptional accuracy and repeatability',
      'Onboard cooling extends reagent stability'
    ],
    installationSupport: 'Analyzer positioning, water plant connection, assay parameter programming, LIS integration, and laboratory technician training.'
  },
  {
    id: 'clia-analyzer',
    name: 'CLIA Immunology Analyzers',
    category: 'Laboratory',
    description: 'Chemiluminescence immunoassay analyzers delivering highly sensitive results for hormones, tumor markers, and infectious diseases.',
    image: '/images/cat-lab.png',
    department: 'Immunology',
    features: [
      { icon: Microscope, text: 'Magnetic Separation' },
      { icon: Activity, text: 'Comprehensive Assay Menu' },
      { icon: ShieldCheck, text: 'STAT Prioritization' }
    ],
    technicalSpecs: [
      'Throughput: Up to 120 tests per hour',
      'Time to First Result: ~15 minutes',
      'Reagent Capacity: 20-30 onboard refrigerated positions',
      'Measurement System: PMT (Photomultiplier Tube) based chemiluminescence'
    ],
    benefits: [
      'Provides superior sensitivity compared to standard ELISA tests',
      'Enables rapid turnaround times for critical cardiac and infectious disease markers',
      'Barcoded reagents prevent loading errors'
    ],
    installationSupport: 'Complete calibration of assay panels, stringent QC verification, and ongoing application support for new assays.'
  },

  // Maternal & Neonatal Care Solutions
  {
    id: 'fetal-monitor',
    name: 'Advanced Infant Incubators (CTG)',
    category: 'Maternal & Neonatal',
    description: 'High-sensitivity monitors for antepartum and intrapartum tracing of fetal heart rate and maternal contractions.',
    image: '/images/cat-neonatal.png',
    department: 'Obstetrics',
    features: [
      { icon: Baby, text: 'Twin Monitoring Capability' },
      { icon: HeartPulse, text: 'Acoustic Stimulator Integration' },
      { icon: ShieldCheck, text: 'Wireless Transducers' }
    ],
    technicalSpecs: [
      'Display: 10" to 12" folding color TFT touchscreen',
      'Transducers: High-sensitivity 12-crystal ultrasound probes (IPX8 waterproof)',
      'Printer: Built-in 152mm thermal array printer',
      'Memory: Up to 24 hours of CTG tracing storage'
    ],
    benefits: [
      'Ensures continuous tracking even with maternal movement via waterproof wireless probes',
      'Automated CTG analysis assists in objective clinical decision making',
      'Central station networking allows remote monitoring of multiple delivery rooms'
    ],
    installationSupport: 'Mounting on wall/trolley, central monitoring software installation, and nursing staff orientation.'
  },
  {
    id: 'infant-warmer',
    name: 'Radiant Infant Warmers',
    category: 'Maternal & Neonatal',
    description: 'Microprocessor-controlled open care systems providing optimal thermal regulation for premature and sick neonates.',
    image: '/images/cat-neonatal.png',
    department: 'NICU',
    features: [
      { icon: Zap, text: 'Servo-Controlled Heating' },
      { icon: Baby, text: 'Integrated Resuscitation Unit' },
      { icon: ShieldCheck, text: 'Apgar Timer' }
    ],
    technicalSpecs: [
      'Modes: Pre-warm, Manual, and Servo Skin mode',
      'Heater: Quartz/Ceramic infrared heating element',
      'Bed: Tilting bed with X-Ray cassette tray',
      'Alarms: High/Low temp, probe failure, power failure, heater failure'
    ],
    benefits: [
      'Prevents cold stress in fragile premature infants',
      'Open design allows unobstructed access for multiple clinicians during emergencies',
      'Integrated resuscitation and phototherapy modules save critical space'
    ],
    installationSupport: 'Assembly, electrical safety verification, temperature calibration, and comprehensive NICU staff training.'
  },

  // Hospital Infrastructure Solutions
  {
    id: 'icu-planning',
    name: 'Turnkey ICU Planning & Setup',
    category: 'Hospital Infrastructure',
    description: 'Comprehensive design and implementation of modern ICUs, adhering strictly to global infection control and spatial guidelines.',
    image: '/images/project-hospital.png',
    department: 'Infrastructure',
    features: [
      { icon: Building2, text: 'Workflow Optimization' },
      { icon: ShieldCheck, text: 'Medical Gas Integration' },
      { icon: Activity, text: 'End-to-End Execution' }
    ],
    technicalSpecs: [
      'Space Planning: Ergonomic bed spacing adhering to NABH/JCI standards',
      'Pendants: Ceiling suspended motorized/fixed medical pendants',
      'HVAC: Independent AHU with positive/negative pressure isolation capabilities',
      'Electrical: Isolated power supply systems (IPS) for patient safety'
    ],
    benefits: [
      'Transforms empty spaces into fully functional, compliant critical care units within weeks',
      'Optimizes nurse-to-patient visibility and workflow',
      'Ensures seamless integration of equipment, gases, and IT systems'
    ],
    installationSupport: 'Full project management from initial 2D/3D CAD layouts to civil execution, equipment integration, and final handover.'
  },
  {
    id: 'modular-ot',
    name: 'Modular Operation Theatres',
    category: 'Hospital Infrastructure',
    description: 'Pre-engineered sterile environments equipped with laminar airflow, seamless anti-bacterial surfaces, and advanced pendants.',
    image: '/images/project-hospital.png',
    department: 'Infrastructure',
    features: [
      { icon: Wind, text: 'HEPA Filtration Systems' },
      { icon: Building2, text: 'Anti-Static Flooring' },
      { icon: ShieldCheck, text: 'Surgeon Control Panels' }
    ],
    technicalSpecs: [
      'Wall Panels: Pre-fabricated SS 304 / Anti-bacterial powder-coated GI',
      'Airflow: Class 100/10,000 Laminar Air Flow ceiling systems',
      'Doors: Hermetically sealed automated sliding doors',
      'Integration: Digital surgeon control panels for lights, gases, and PACS'
    ],
    benefits: [
      'Drastically reduces surgical site infections (SSI)',
      'Easy to clean, maintain, and upgrade without major civil disruption',
      'Creates a state-of-the-art environment to attract top surgical talent'
    ],
    installationSupport: 'End-to-end design, manufacturing, and rapid on-site installation by specialized engineers, including HVAC validation.'
  }
]
