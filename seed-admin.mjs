import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Load env vars natively using Node's process.env if run with --env-file
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Make sure to run with --env-file=.env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@saferx.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  console.log(`Seeding admin user: ${email}`);

  // Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if admin already exists
  const { data: existingAdmin } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingAdmin) {
    console.log("Admin user already exists! Skipping.");
    return;
  }

  // Insert the admin
  const { data, error } = await supabase
    .from('admin_users')
    .insert([{
      email,
      hashed_password: hashedPassword,
      is_active: true
    }]);

  if (error) {
    console.error("Error inserting admin user:", error.message);
  } else {
    console.log("Admin user seeded successfully! You can now log into the dashboard.");
  }
}

seedAdmin();
