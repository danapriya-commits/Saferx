export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    const { data: article, error } = await supabase
      .from('knowledge_centre')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !article || !article.is_published) {
      return NextResponse.json({ detail: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching single article:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
