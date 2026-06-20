export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ equipment_id: string }> }
) {
  try {
    const { equipment_id } = await params;
    const data = await request.json();
    
    const updateData: any = {
      title: data.title,
      category: data.category,
      short_description: data.short_description,
      description: data.description,
    };
    
    if (data.image_url) {
      updateData.image_url = data.image_url;
    }

    const { error } = await supabase
      .from('medical_equipment')
      .update(updateData)
      .eq('id', equipment_id);

    if (error) throw error;

    return NextResponse.json({ status: "success", message: "Equipment updated successfully" });
  } catch (error) {
    console.error('Error updating equipment:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ equipment_id: string }> }
) {
  try {
    const { equipment_id } = await params;

    const { error } = await supabase
      .from('medical_equipment')
      .delete()
      .eq('id', equipment_id);

    if (error) throw error;

    return NextResponse.json({ status: "success", message: "Equipment deleted successfully" });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
