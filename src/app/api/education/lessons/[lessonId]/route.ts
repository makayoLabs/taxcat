import { NextRequest, NextResponse } from 'next/server';
import taxBasicsModule from '@/data/modules/tax-basics-for-teens.json';

// GET /api/education/lessons/[lessonId] - Get lesson content
export async function GET(
  request: NextRequest,
  { params }: { params: { lessonId: string } }
) {
  try {
    const { lessonId } = params;

    // Find lesson in our module data
    const lesson = taxBasicsModule.lessons.find(l => l.id === lessonId);

    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lesson: {
        ...lesson,
        moduleId: taxBasicsModule.id,
        moduleTitle: taxBasicsModule.title,
      },
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
