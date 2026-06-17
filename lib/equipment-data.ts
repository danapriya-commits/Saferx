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
  Radio,
  Monitor
} from 'lucide-react'
import { Product } from './products-data'

export const EQUIPMENT_CATEGORIES: { name: string; icon: React.ElementType }[] = [
  { name: 'Critical Care', icon: Activity },
  { name: 'Diagnostic Imaging', icon: ScanLine },
  { name: 'Laboratory Equipment', icon: Microscope },
  { name: 'Maternal & Neonatal Care', icon: Baby },
  { name: 'Operation Theatre Equipment', icon: Building2 },
  { name: 'Monitoring Systems', icon: Monitor },
]

export const EQUIPMENT_LIST: Product[] = []
