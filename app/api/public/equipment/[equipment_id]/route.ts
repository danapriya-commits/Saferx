import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ equipment_id: string }> }
) {
  try {
    const { equipment_id } = await params;
    
    const { data: equipment, error } = await supabase
      .from('medical_equipment')
      .select('*')
      .eq('id', equipment_id)
      .single();

    if (error || !equipment || !equipment.is_active) {
      return NextResponse.json({ detail: 'Equipment not found' }, { status: 404 });
    }

    return NextResponse.json(equipment);
  } catch (error) {
    console.error('Error fetching single equipment:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
