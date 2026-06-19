import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ article_id: string }> }
) {
  try {
    const { article_id } = await params;

    const { error } = await supabase
      .from('knowledge_centre')
      .delete()
      .eq('id', article_id);

    if (error) throw error;

    return NextResponse.json({ status: "success", message: "Article deleted successfully" });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
