export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: articles, error } = await supabase
      .from('knowledge_centre')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ articles: articles || [] });
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

