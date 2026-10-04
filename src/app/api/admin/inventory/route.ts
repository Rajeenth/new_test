import { NextResponse } from 'next/server';
import { DataStore } from '@/lib/dataStore';

export async function GET() {
  return NextResponse.json(DataStore.getAdjustments());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { batchCode, change, reason, adminName } = body;
    
    if (!batchCode || change === undefined || !reason) {
      return NextResponse.json({ error: 'Missing batchCode, change quantity, or audit reason' }, { status: 400 });
    }

    const log = DataStore.adjustInventory(batchCode, Number(change), reason, adminName || 'Farm Admin');
    const updatedBatch = DataStore.getBatchByCode(batchCode);

    return NextResponse.json({
      success: true,
      log,
      updatedBatch
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to record inventory adjustment' }, { status: 400 });
  }
}
