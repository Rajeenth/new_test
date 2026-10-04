import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = (formData.get('category') as string) || 'batches'; // 'batches' or 'parent-palms'
    const tag = (formData.get('tag') as string) || 'general'; // e.g., 'EM-0926-A' or 'EM-MP-014'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    // Sanitize folder path
    const safeTag = tag.replace(/[^a-zA-Z0-9_-]/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', category, safeTag);

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const savedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate clean filename
      const timeStamp = Date.now();
      const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const filename = `${timeStamp}_${sanitizedFilename}`;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);
      
      const publicUrl = `/uploads/${category}/${safeTag}/${filename}`;
      savedUrls.push(publicUrl);
    }

    return NextResponse.json({ 
      success: true, 
      urls: savedUrls,
      message: `Uploaded ${savedUrls.length} image(s) to /uploads/${category}/${safeTag}/` 
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}
