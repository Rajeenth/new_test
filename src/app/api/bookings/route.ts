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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mobile = searchParams.get('mobile');
  if (mobile) {
    return NextResponse.json(DataStore.getBookingsByMobile(mobile));
  }
  return NextResponse.json(DataStore.getBookings());
}
