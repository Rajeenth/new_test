import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/dataStore';

export async function GET() {
  return NextResponse.json(DataStore.getParentPalms());
}
