import { NextRequest, NextResponse } from 'next/server';
import taxBasicsModule from '@/data/modules/tax-basics-for-teens.json';

// GET /api/education/modules/[slug] - Get module details with lessons
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // In production, query database by slug
    // For now, match against our hardcoded module
    if (slug === taxBasicsModule.slug) {
      return NextResponse.json({
        success: true,
        module: taxBasicsModule,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Module not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching module:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch module' },
      { status: 500 }
    );
  }
}
