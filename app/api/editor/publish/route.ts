export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

interface ContentItem {
  page: string;
  section: string;
  field_key: string;
  content_type?: string;
  content_value: string;
}

async function deleteOldImage(oldUrl: string) {
  if (!oldUrl) return;
  if (oldUrl.includes('/storage/v1/object/public/Saferx/')) {
    try {
      const parts = oldUrl.split('/Saferx/');
      if (parts.length > 1) {
        const filename = decodeURIComponent(parts[1]);
        if (filename) {
          const { error } = await supabase.storage.from('Saferx').remove([filename]);
          if (error) {
            console.error(`Failed to delete old image ${filename}:`, error);
          } else {
            console.log(`Deleted old image: ${filename}`);
          }
        }
      }
    } catch (err) {
      console.error('Error in deleteOldImage:', err);
    }
  }
}

export async function POST(req: Request) {
  try {
    const { items } = await req.json() as { items: ContentItem[] };

    // 1. Process items passed directly from the frontend
    for (const item of items) {
      const { data: published } = await supabase
        .from('website_content')
        .select('*')
        .eq('page', item.page)
        .eq('section', item.section)
        .eq('field_key', item.field_key)
        .eq('status', 'published')
        .single();

      if (published) {
        if (published.content_value !== item.content_value && 
            published.content_value?.includes('/storage/v1/object/public/Saferx/')) {
          await deleteOldImage(published.content_value);
        }

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

      await supabase
        .from('website_content')
        .delete()
        .eq('page', item.page)
        .eq('section', item.section)
        .eq('field_key', item.field_key)
        .eq('status', 'draft');
    }

    // 2. Fetch any remaining drafts from the database and publish them
    const { data: existingDrafts } = await supabase
      .from('website_content')
      .select('*')
      .eq('status', 'draft');

    if (existingDrafts && existingDrafts.length > 0) {
      for (const draft of existingDrafts) {
        const { data: published } = await supabase
          .from('website_content')
          .select('*')
          .eq('page', draft.page)
          .eq('section', draft.section)
          .eq('field_key', draft.field_key)
          .eq('status', 'published')
          .single();

        if (published) {
          if (published.content_value !== draft.content_value && 
              published.content_value?.includes('/storage/v1/object/public/Saferx/')) {
            await deleteOldImage(published.content_value);
          }

          await supabase
            .from('website_content')
            .update({ content_value: draft.content_value })
            .eq('id', published.id);
        } else {
          await supabase
            .from('website_content')
            .insert({
              page: draft.page,
              section: draft.section,
              field_key: draft.field_key,
              content_type: draft.content_type || 'text',
              content_value: draft.content_value,
              status: 'published'
            });
        }

        await supabase
          .from('website_content')
          .delete()
          .eq('id', draft.id);
      }
    }

    // Revalidate the entire site so the published changes appear immediately
    revalidatePath('/', 'layout');

    return NextResponse.json({ status: "success", message: `${items.length} items published.` });
  } catch (error) {
    console.error('Error publishing content:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}

