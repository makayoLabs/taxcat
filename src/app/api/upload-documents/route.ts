import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const userId = formData.get('userId') as string;
    const taxReturnId = formData.get('taxReturnId') as string;

    if (!files?.length || !userId || !taxReturnId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const uploadedDocuments = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a unique filename
      const id = crypto.randomUUID();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${id}.${fileExtension}`;

      // Save file to disk
      const path = join(process.cwd(), 'public', 'uploads', fileName);
      await writeFile(path, buffer);

      // Save document metadata to database
      // In a real application, you would save this to your database
      uploadedDocuments.push({
        id,
        name: file.name,
        type: file.type,
        path: `/uploads/${fileName}`,
        userId,
        taxReturnId,
      });
    }

    return NextResponse.json({
      message: 'Files uploaded successfully',
      documents: uploadedDocuments,
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json({ error: 'Error uploading files' }, { status: 500 });
  }
}
