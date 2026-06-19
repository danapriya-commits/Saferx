import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Get max display order
    const { data: maxOrderData } = await supabase
      .from('medical_equipment')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .single();
      
    const newOrder = (maxOrderData?.display_order || 0) + 1;

    // Create new equipment
    const { data: equipment, error } = await supabase
      .from('medical_equipment')
      .insert({
        title: data.title,
        short_description: data.short_description || '',
        description: data.description || '',
        category: data.category || '',
        image_url: data.image_url || '',
        is_active: true,
        display_order: newOrder
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      status: "success",
      equipment: equipment
    });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
