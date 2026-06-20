import { createClient, SupabaseClient } from '@supabase/supabase-js'

const rawSupabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseUrl = rawSupabaseUrl.replace(/\/rest\/v1\/?$/, '')
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabase: SupabaseClient

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey)
} else {
  // During build time, env vars may not be available.
  // Create a placeholder that will be replaced at runtime.
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

export { supabase }
