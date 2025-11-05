import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';

async function getUserFromToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  const payload = AuthService.verifyToken(token);
  if (!payload) return null;

  return await prisma.user.findUnique({
    where: { id: payload.userId },
  });
}

export async function GET(): Promise<NextResponse> {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const taxReturns = await prisma.taxReturn.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: {
            documents: true,
            deductions: true,
            dependents: true,
          },
        },
      },
    });

    return NextResponse.json(taxReturns);
  } catch (error) {
    console.error('Error fetching tax returns:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      year,
      filingStatus,
      type = 'T1_GENERAL',
    } = body;

    // Validate required fields
    if (!year || !filingStatus) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if tax return already exists for this year
    const existingReturn = await prisma.taxReturn.findFirst({
      where: {
        userId: user.id,
        year: parseInt(year),
      },
    });

    if (existingReturn) {
      return NextResponse.json({ error: 'Tax return for this year already exists' }, { status: 400 });
    }

    const taxReturn = await prisma.taxReturn.create({
      data: {
        userId: user.id,
        year: parseInt(year),
        filingStatus,
        type,
      },
    });

    return NextResponse.json(taxReturn, { status: 201 });
  } catch (error) {
    console.error('Error creating tax return:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}