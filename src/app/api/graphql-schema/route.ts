import { NextRequest, NextResponse } from 'next/server';

import { fetchGraphSchema } from '@/shared/utils/get-graph-schem';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const urlDoc = searchParams.get('urlDoc');

  if (!urlDoc) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const schema = await fetchGraphSchema(urlDoc);

    return NextResponse.json(schema, { status: 200 });
  } catch (error) {
    const e = error as Error;

    console.error('Error fetching schema:', e.message);

    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
