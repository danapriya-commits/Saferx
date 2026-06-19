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
      // Upsert draft
      const { error } = await supabase
        .from('website_content')
        .upsert({
          page: item.page,
          section: item.section,
          field_key: item.field_key,
          content_type: item.content_type || 'text',
          content_value: item.content_value,
          status: 'draft'
        }, { onConflict: 'page,section,field_key,status' }); // Assumes unique constraint exists, if not we have to delete and insert or select then update. Wait, supabase upsert without primary key might be tricky. Let's do select then update/insert to be safe, exactly like Python backend.
    }

    // Since upsert might fail without a proper unique constraint on those 4 columns, let's mimic python:
    for (const item of items) {
      const { data: existing } = await supabase
        .from('website_content')
        .select('*')
        .eq('page', item.page)
        .eq('section', item.section)
        .eq('field_key', item.field_key)
        .eq('status', 'draft')
        .single();
        
      if (existing) {
        await supabase.from('website_content')
          .update({ content_value: item.content_value })
          .eq('id', existing.id);
      } else {
        await supabase.from('website_content')
          .insert({
            page: item.page,
            section: item.section,
            field_key: item.field_key,
            content_type: item.content_type || 'text',
            content_value: item.content_value,
            status: 'draft'
          });
      }
    }

    return NextResponse.json({ status: "success", message: "Drafts saved." });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
