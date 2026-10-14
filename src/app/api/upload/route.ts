import { NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
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
    const targetDir = path.join(process.cwd(), 'public', 'images', category, safeTag);

    let canWriteToDisk = true;
    try {
      await mkdir(targetDir, { recursive: true });
    } catch {
      canWriteToDisk = false;
    }

    const savedUrls: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      let savedToDisk = false;
      if (canWriteToDisk) {
        try {
          const timeStamp = Date.now();
          const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
          const filename = `${timeStamp}_${sanitizedFilename}`;
          const filePath = path.join(targetDir, filename);
          await writeFile(filePath, buffer);
          const publicUrl = `/images/${category}/${safeTag}/${filename}`;
          savedUrls.push(publicUrl);
          savedToDisk = true;
        } catch {
          savedToDisk = false;
        }
      }

      // If read-only filesystem (e.g. Vercel serverless /var/task), fall back to base64 Data URL
      if (!savedToDisk) {
        const mimeType = file.type || 'image/jpeg';
        const base64 = buffer.toString('base64');
        savedUrls.push(`data:${mimeType};base64,${base64}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      urls: savedUrls,
      message: `Processed ${savedUrls.length} image(s)` 
    });
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: error.message || 'File upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    if (!imagePath) {
      return NextResponse.json({ error: 'Image path parameter required' }, { status: 400 });
    }

    // Normalize path to prevent directory traversal
    const relativePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const fullPath = path.join(process.cwd(), 'public', relativePath);

    // Only allow deleting within /public/images/
    if (!fullPath.startsWith(path.join(process.cwd(), 'public', 'images'))) {
      return NextResponse.json({ error: 'Unauthorized path deletion' }, { status: 403 });
    }

    try {
      await unlink(fullPath);
    } catch (e) {
      // Ignore if file doesn't exist on disk
    }

    return NextResponse.json({ success: true, message: `File ${imagePath} removed from server.` });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'File deletion failed' }, { status: 500 });
  }
}
