import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 'home';
    const status = searchParams.get('status') || 'published';

    // Get published content
    const { data: publishedItems, error: pubError } = await supabase
      .from('website_content')
      .select('*')
      .eq('page', page)
      .eq('status', 'published');

    if (pubError) throw pubError;

    const contentMap: Record<string, Record<string, string>> = {};

    publishedItems?.forEach(item => {
      if (!contentMap[item.section]) contentMap[item.section] = {};
      contentMap[item.section][item.field_key] = item.content_value;
    });

    // If draft requested, merge drafts over published
    if (status === 'draft') {
      const { data: draftItems, error: draftError } = await supabase
        .from('website_content')
        .select('*')
        .eq('page', page)
        .eq('status', 'draft');

      if (draftError) throw draftError;

      draftItems?.forEach(item => {
        if (!contentMap[item.section]) contentMap[item.section] = {};
        contentMap[item.section][item.field_key] = item.content_value;
      });
    }

    return NextResponse.json(contentMap);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ detail: 'Internal server error' }, { status: 500 });
  }
}
