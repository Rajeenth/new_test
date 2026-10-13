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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await request.json();
    // Only allow updating the images array via this endpoint
    if (!Array.isArray(body.images)) {
      return NextResponse.json({ error: 'images array is required' }, { status: 400 });
    }
    const updated = DataStore.updateBatch(code, { images: body.images });
    if (!updated) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update images' }, { status: 500 });
  }
}
