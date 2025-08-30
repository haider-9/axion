import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // In production, you'd want to upload to a storage service like AWS S3
    // This is a simplified example that saves to the public folder
    const publicFolderPath = join(process.cwd(), 'public', 'uploads');
    
    // Create uploads directory if it doesn't exist
    if (!existsSync(publicFolderPath)) {
      await mkdir(publicFolderPath, { recursive: true });
    }
    
    const filePath = join(publicFolderPath, fileName);
    
    try {
      // Convert file to buffer and write to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file');
    }

    // Return the file URL
    const fileUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({
      success: true,
      fileUrl,
      fileName,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
