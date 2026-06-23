export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: equipment, error } = await supabase
      .from('medical_equipment')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ equipment: equipment || [] });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

