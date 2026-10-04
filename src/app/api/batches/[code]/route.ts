import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/dataStore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const batch = DataStore.getBatchByCode(code);
  if (!batch) {
    return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
  }
  return NextResponse.json(batch);
}
