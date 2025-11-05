import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content');
const homepagePath = path.join(contentPath, 'home.json');

// Helper function to ensure the content directory exists
async function ensureContentDirectory(): Promise<void> {
  try {
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }
}

// Helper function to validate auth token
function validateToken(request: Request): void {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token');

  if (!token || token.value !== 'your-secure-token-here') {
    throw new Error('Unauthorized');
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    await ensureContentDirectory();

    try {
      const content = await fs.readFile(homepagePath, 'utf-8');
      return NextResponse.json(JSON.parse(content));
    } catch (error) {
      console.warn('Home page content not found, using default:', error);
      // Return default page structure if file doesn't exist
      return NextResponse.json({
        id: 'home',
        title: 'Home Page',
        slug: '/',
        status: 'published',
        seo: {
          title: 'TaxCat - Professional Tax Advisory',
          description: 'Expert tax advisory services for individuals and businesses',
          keywords: ['tax', 'advisory', 'accounting', 'finance'],
        },
        blocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error loading home page:', error);
    return NextResponse.json({ error: 'Failed to load page content' }, { status: 500 });
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    // Validate auth token
    validateToken(request);

    // Ensure content directory exists
    await ensureContentDirectory();

    // Get the updated content from the request
    const content = await request.json();

    // Validate the content structure
    if (!content.id || !content.blocks) {
      return NextResponse.json({ error: 'Invalid content structure' }, { status: 400 });
    }

    // Update timestamps
    content.updatedAt = new Date().toISOString();

    // Save the content to file
    await fs.writeFile(homepagePath, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Error saving home page:', error);
    return NextResponse.json({ error: 'Failed to save page content' }, { status: 500 });
  }
}
