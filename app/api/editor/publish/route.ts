import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ContentItem {
  page: string;
  section: string;
  field_key: string;
  content_type?: string;
  content_value: string;
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json() as { items: ContentItem[] };

    for (const item of items) {
      // 1. Check if published row exists
      const { data: published } = await supabase
        .from('website_content')
        .select('*')
        .eq('page', item.page)
        .eq('section', item.section)
        .eq('field_key', item.field_key)
        .eq('status', 'published')
        .single();

      if (published) {
        // If image and URL changed, ideally we'd delete the old image from Supabase Storage here.
        // We will skip the deletion step for now to ensure data safety during migration.
        await supabase
          .from('website_content')
          .update({ content_value: item.content_value })
          .eq('id', published.id);
      } else {
        await supabase
          .from('website_content')
          .insert({
            page: item.page,
            section: item.section,
            field_key: item.field_key,
            content_type: item.content_type || 'text',
            content_value: item.content_value,
            status: 'published'
          });
      }

      // 2. Delete draft if it exists
      await supabase
        .from('website_content')
        .delete()
        .eq('page', item.page)
        .eq('section', item.section)
        .eq('field_key', item.field_key)
        .eq('status', 'draft');
    }

    return NextResponse.json({ status: "success", message: `${items.length} items published.` });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
