// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { randomUUID } from 'crypto';
import { DataStore } from '@/lib/dataStore';

/**
 * Ensure a directory exists – creates it recursively if needed.
 */
async function ensureDir(dirPath: string) {
  await fs.mkdir(dirPath, { recursive: true });
}

/**
 * POST handler for image uploads.
 * Expected multipart fields:
 *   - file: the binary image
 *   - type: one of "receipt", "batch", "mother-tree", etc.
 *   - orderId (optional, required when type === "receipt")
 */
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const file = form.get('file') as File | null;
    const type = (form.get('type') as string | null) ?? 'generic';
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Determine where to store the file
    const baseFolder = join(
      process.cwd(),
      'public',
      'images',
      type === 'receipt' ? 'receipts' : type
    );
    await ensureDir(baseFolder);

    // Build a unique filename
    const ext = file.name.split('.').pop() ?? 'png';
    const filename = `${randomUUID()}-${Date.now()}.${ext}`;
    const filePath = join(baseFolder, filename);

    // Write the file to disk
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // Public URL that the client can use
    const publicUrl = `/images/${type === 'receipt' ? 'receipts' : type}/${filename}`;

    // Persist the URL in the JSON DB
    if (type === 'receipt') {
      const orderId = form.get('orderId') as string | null;
      if (!orderId) {
        return NextResponse.json(
          { error: 'orderId is required for receipt uploads' },
          { status: 400 }
        );
      }
      // Update only the receiptUrl field for the order
      DataStore.updateOrder(orderId, { receiptUrl: publicUrl });
    } else {
      // Generic fallback – you can adapt this to other entities if needed
      DataStore.addImageReference(type, publicUrl);
    }

    return NextResponse.json({ url: publicUrl }, { status: 201 });
  } catch (err: any) {
    console.error('Upload error →', err);
    return NextResponse.json(
      { error: err.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
