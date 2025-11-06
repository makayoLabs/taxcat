import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import taxBasicsModule from '@/data/modules/tax-basics-for-teens.json';

// GET /api/education/modules - List all available modules
export async function GET(request: NextRequest) {
  try {
    // In production, this would query the database
    // For now, we'll return our hardcoded module
    const modules = [
      {
        id: taxBasicsModule.id,
        slug: taxBasicsModule.slug,
        title: taxBasicsModule.title,
        description: taxBasicsModule.description,
        category: taxBasicsModule.category,
        difficulty: taxBasicsModule.difficulty,
        estimatedMinutes: taxBasicsModule.estimatedMinutes,
        order: taxBasicsModule.order,
        pointsReward: taxBasicsModule.pointsReward,
        learningObjectives: taxBasicsModule.learningObjectives,
        thumbnailUrl: taxBasicsModule.thumbnailUrl,
        lessonsCount: taxBasicsModule.lessons.length,
        // TODO: Add user progress when authenticated
        progress: 0,
        isCompleted: false,
      }
    ];

    return NextResponse.json({
      success: true,
      modules,
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}
