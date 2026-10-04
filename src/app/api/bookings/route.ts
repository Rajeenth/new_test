import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/dataStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBooking = DataStore.createBooking(body);
    return NextResponse.json(newBooking, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create booking' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(DataStore.getBookings());
}
