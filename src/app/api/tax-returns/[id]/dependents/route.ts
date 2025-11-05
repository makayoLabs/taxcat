import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { AuthService } from '@/lib/auth';
import { RelationshipType } from '@prisma/client';

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

interface DependentInput {
  firstName: string;
  lastName: string;
  ssn: string;
  relationship: RelationshipType;
  dateOfBirth: string;
}

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const taxReturn = await prisma.taxReturn.findUnique({
      where: { id: params.id },
    });

    if (!taxReturn) {
      return NextResponse.json({ error: 'Tax return not found' }, { status: 404 });
    }

    if (taxReturn.userId !== user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const data = await request.json();
    const { dependents } = data;

    // Delete existing dependents
    await prisma.dependent.deleteMany({
      where: { taxReturnId: params.id },
    });

    // Create new dependents
    if (dependents.length > 0) {
      await prisma.dependent.createMany({
        data: dependents.map((dependent: DependentInput) => ({
          taxReturnId: params.id,
          firstName: dependent.firstName,
          lastName: dependent.lastName,
          ssn: dependent.ssn,
          relationship: dependent.relationship,
          dateOfBirth: new Date(dependent.dateOfBirth),
        })),
      });
    }

    // Update tax return
    const updatedTaxReturn = await prisma.taxReturn.update({
      where: { id: params.id },
      data: {
        status: 'IN_PROGRESS' as const,
      },
    });

    return NextResponse.json(updatedTaxReturn);
  } catch (error) {
    console.error('Error updating dependents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
