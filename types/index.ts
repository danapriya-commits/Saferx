export interface AuthResponse {
  access_token: string;
  admin_username?: string;
  admin_email: string;
}

export interface ImageObject {
  id?: string | number;
  image_key: string;
  label: string;
  section: string;
  filename: string;
  file_path?: string;
  file_size_kb?: number;
  width?: number;
  height?: number;
  mime_type?: string;
  uploaded_at?: string;
  uploaded_by?: string;
}

export interface ContactInfo {
  company_name?: string;
  tagline?: string;
  business_hours?: string;
  primary_phone?: string;
  secondary_phone?: string;
  whatsapp_number?: string;
  primary_email?: string;
  secondary_email?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
  google_maps_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  instagram_url?: string;
}
