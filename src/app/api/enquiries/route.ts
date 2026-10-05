import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/dataStore';

export async function GET() {
  return NextResponse.json(DataStore.getEnquiries());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.mobile || !body.message) {
      return NextResponse.json({ error: 'Name, mobile, and message are required' }, { status: 400 });
    }
    const newEnquiry = DataStore.addEnquiry(body);
    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }
    const updated = DataStore.updateEnquiryStatus(id, status);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update enquiry' }, { status: 500 });
  }
}
