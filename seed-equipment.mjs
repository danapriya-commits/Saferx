import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const EQUIPMENT_LIST = [
    {
        title: "Patient Monitor",
        category: "Monitoring Systems",
        short_description: "High-acuity patient monitor with multi-parameter capabilities for continuous tracking in intensive care.",
        image_url: "/images/cat-monitoring.png",
        description: "High-acuity patient monitor with multi-parameter capabilities for continuous tracking in intensive care. Screen Size: 15-inch TFT touch display. Battery: 4 hours backup. Parameters: Up to 10 waveforms."
    },
    {
        title: "Central Monitoring Station",
        category: "Monitoring Systems",
        short_description: "Centralized network system to monitor multiple patients simultaneously from a central nursing desk.",
        image_url: "/images/hero-icu.png",
        description: "Centralized network system to monitor multiple patients simultaneously from a central nursing desk. Dual 24\" HD displays. Wired/Wireless network support. Storage: 240 hours trend data."
    },
    {
        title: "Holter Monitor",
        category: "Monitoring Systems",
        short_description: "Compact, lightweight ambulatory ECG device for 24-48 hour continuous cardiac monitoring.",
        image_url: "/images/cat-cardiology.png",
        description: "Compact, lightweight ambulatory ECG device for 24-48 hour continuous cardiac monitoring. Weight: <50g. Battery: 1x AAA for up to 7 days. Sampling rate: Up to 10,000 Hz."
    },
    {
        title: "ICU Ventilator",
        category: "Critical Care",
        short_description: "High-end intensive care ventilator offering advanced modes for invasive and non-invasive respiratory support.",
        image_url: "/images/hero-icu.png",
        description: "High-end intensive care ventilator offering advanced modes for invasive and non-invasive respiratory support. Tidal Volume: 2ml to 2000ml. Built-in turbine or air compressor. Screen: 15\" detachable touch screen."
    },
    {
        title: "Defibrillator",
        category: "Critical Care",
        short_description: "Biphasic defibrillator with synchronized cardioversion, AED, and external pacing capabilities.",
        image_url: "/images/cat-cardiology.png",
        description: "Biphasic defibrillator with synchronized cardioversion, AED, and external pacing capabilities. Energy range: 1J to 360J. Waveform: BTE. Display: 8\" color TFT."
    },
    {
        title: "Syringe Pump",
        category: "Critical Care",
        short_description: "High-precision micro-infusion syringe pump for accurate delivery of critical medications.",
        image_url: "/images/hero-icu.png",
        description: "High-precision micro-infusion syringe pump for accurate delivery of critical medications. Compatible syringes: 5ml to 60ml. Flow rate: 0.1 to 1500 ml/h. Accuracy: ±2%."
    },
    {
        title: "Infusion Pump",
        category: "Critical Care",
        short_description: "Volumetric infusion pump designed for safe and continuous delivery of IV fluids and medications.",
        image_url: "/images/hero-icu.png",
        description: "Volumetric infusion pump designed for safe and continuous delivery of IV fluids and medications. Flow rate: 0.1 to 1200 ml/h. Accuracy: ±5%. Battery: 8 hours backup."
    },
    {
        title: "ECG Machine",
        category: "Critical Care",
        short_description: "Digital 12-channel electrocardiograph with advanced interpretation algorithms and printing capabilities.",
        image_url: "/images/cat-cardiology.png",
        description: "Digital 12-channel electrocardiograph with advanced interpretation algorithms and printing capabilities. Screen: 8\" color touch screen. Paper size: A4/Letter or Z-fold. Battery: Prints up to 300 ECGs."
    },
    {
        title: "Fetal Monitor",
        category: "Maternal & Neonatal Care",
        short_description: "High-performance fetal and maternal monitor for tracking fetal heart rate and uterine activity.",
        image_url: "/images/cat-neonatal.png",
        description: "High-performance fetal and maternal monitor for tracking fetal heart rate and uterine activity. Display: 12\" folding screen. Probe: Waterproof 12-crystal ultrasound. Storage: 24h CTG trace."
    },
    {
        title: "CTG Machine",
        category: "Maternal & Neonatal Care",
        short_description: "Cardiotocography machine designed for routine antenatal check-ups and labor monitoring.",
        image_url: "/images/cat-neonatal.png",
        description: "Cardiotocography machine designed for routine antenatal check-ups and labor monitoring. Screen: 7\" TFT display. Battery: 4 hours continuous use. Weight: Lightweight design."
    },
    {
        title: "Neonatal Ventilator",
        category: "Maternal & Neonatal Care",
        short_description: "Specialized ventilator designed specifically for the delicate lungs of premature and critically ill neonates.",
        image_url: "/images/cat-neonatal.png",
        description: "Specialized ventilator designed specifically for the delicate lungs of premature and critically ill neonates. Patient range: < 300g to 30kg. Tidal volume: Down to 2ml. Response time: Extremely fast trigger."
    },
    {
        title: "Digital X-Ray",
        category: "Diagnostic Imaging",
        short_description: "Ceiling or floor-mounted digital radiography system offering high throughput and exceptional image quality.",
        image_url: "/images/cat-imaging.png",
        description: "Ceiling or floor-mounted digital radiography system offering high throughput and exceptional image quality. Power: 50kW / 80kW options. Detector: a-Si with CsI. Table weight limit: 300kg."
    },
    {
        title: "Mobile X-Ray",
        category: "Diagnostic Imaging",
        short_description: "Motorized mobile DR system bringing high-quality digital imaging directly to the patient bedside.",
        image_url: "/images/cat-imaging.png",
        description: "Motorized mobile DR system bringing high-quality digital imaging directly to the patient bedside. Power: 32kW. Battery powered movement & exposure. Detector: 14\"x17\" wireless FPD."
    },
    {
        title: "Ultrasound System",
        category: "Diagnostic Imaging",
        short_description: "Versatile color Doppler ultrasound platform for general imaging, obstetrics, and cardiology.",
        image_url: "/images/cat-imaging.png",
        description: "Versatile color Doppler ultrasound platform for general imaging, obstetrics, and cardiology. Display: 21\" articulating LED monitor. Touch panel: 10\" customizable. Ports: 4 active probe ports."
    },
    {
        title: "C-Arm System",
        category: "Diagnostic Imaging",
        short_description: "Mobile fluoroscopy system providing real-time intraoperative imaging for surgical procedures.",
        image_url: "/images/cat-imaging.png",
        description: "Mobile fluoroscopy system providing real-time intraoperative imaging for surgical procedures. Detector: 9\" II or Flat Panel options. Generator: 5kW to 15kW monoblock. Storage: Dual monitor trolley."
    },
    {
        title: "Hematology Analyzer",
        category: "Laboratory Equipment",
        short_description: "Fully automated 5-part differential blood cell counter utilizing laser flow cytometry.",
        image_url: "/images/cat-lab.png",
        description: "Fully automated 5-part differential blood cell counter utilizing laser flow cytometry. Throughput: 60 to 90 tests/hour. Parameters: 29 reportable parameters. Sample volume: 15 µL."
    },
    {
        title: "Biochemistry Analyzer",
        category: "Laboratory Equipment",
        short_description: "Automated clinical chemistry analyzer for high-volume serum and plasma testing.",
        image_url: "/images/cat-lab.png",
        description: "Automated clinical chemistry analyzer for high-volume serum and plasma testing. Throughput: Up to 800 tests/hour. Cuvette: Hard glass permanent. Reagent positions: 80+."
    },
    {
        title: "CLIA Analyzer",
        category: "Laboratory Equipment",
        short_description: "Chemiluminescence immunoassay system for highly sensitive hormone, infectious disease, and tumor marker testing.",
        image_url: "/images/cat-lab.png",
        description: "Chemiluminescence immunoassay system for highly sensitive hormone, infectious disease, and tumor marker testing. Throughput: Up to 120 tests/hour. Time to first result: 15 mins. Methodology: PMT-based chemiluminescence."
    },
    {
        title: "Electrolyte Analyzer",
        category: "Laboratory Equipment",
        short_description: "Compact analyzer utilizing Ion Selective Electrode (ISE) technology for rapid Na, K, Cl, Ca, and pH testing.",
        image_url: "/images/cat-lab.png",
        description: "Compact analyzer utilizing Ion Selective Electrode (ISE) technology for rapid Na, K, Cl, Ca, and pH testing. Sample volume: <100 µL. Electrodes: Long-life maintenance-free. Reagent: All-in-one pack."
    },
    {
        title: "OT Light",
        category: "Operation Theatre Equipment",
        short_description: "Advanced LED surgical operating light providing shadowless illumination with adjustable color temperature.",
        image_url: "/images/project-hospital.png",
        description: "Advanced LED surgical operating light providing shadowless illumination with adjustable color temperature. Intensity: Up to 160,000 Lux. Color Temp: 3500K - 5000K. Lifespan: >60,000 hours LED life."
    },
    {
        title: "OT Table",
        category: "Operation Theatre Equipment",
        short_description: "Fully electro-hydraulic operating table offering comprehensive positioning for all surgical disciplines.",
        image_url: "/images/project-hospital.png",
        description: "Fully electro-hydraulic operating table offering comprehensive positioning for all surgical disciplines. Weight capacity: Up to 350kg. Movements: Trendelenburg, Tilt, Elevation, Slide. Battery backup included."
    },
    {
        title: "Anaesthesia Workstation",
        category: "Operation Theatre Equipment",
        short_description: "Integrated anaesthesia delivery system with advanced ventilation capabilities and comprehensive gas monitoring.",
        image_url: "/images/project-hospital.png",
        description: "Integrated anaesthesia delivery system with advanced ventilation capabilities and comprehensive gas monitoring. Ventilator: VCV, PCV, SIMV, PSV modes. Vaporizers: Selectatec compatible (Iso/Sevo/Halo). Screen: 15\" touch screen."
    }
];

async function seed() {
  console.log("Seeding medical equipment data...");
  let count = 0;
  
  for (const item of EQUIPMENT_LIST) {
    const { data: existing } = await supabase
      .from('medical_equipment')
      .select('id')
      .eq('title', item.title)
      .single();

    if (!existing) {
      const { error } = await supabase.from('medical_equipment').insert({
        title: item.title,
        category: item.category,
        short_description: item.short_description,
        description: item.description,
        image_url: item.image_url,
        is_active: true
      });
      
      if (error) {
        console.error("Error inserting:", item.title, error);
      } else {
        console.log("Inserted:", item.title);
        count++;
      }
    } else {
      console.log("Skipping existing:", item.title);
    }
  }
  
  console.log(`Finished! Inserted ${count} new items.`);
}

seed();
