import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const { error } = await supabase
      .from('knowledge_centre')
      .insert({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || '',
        author: data.author || '',
        image_url: data.image_url || '',
        is_published: true,
        published_at: new Date().toISOString()
      });

    if (error) throw error;

    return NextResponse.json({ status: "success", message: "Article created." });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
