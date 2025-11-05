import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { RelationshipType } from '@prisma/client';

interface DependentInput {
  firstName: string;
  lastName: string;
  ssn: string;
  relationship: RelationshipType;
  dateOfBirth: string;
}

export async function PUT(request: Request, { params }: { params: { id: string } }): void {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
        data: dependents.map((___dependent: DependentInput) => ({
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
        hasDependents: dependents.length > 0,
        status: 'IN_PROGRESS' as const,
      },
    });

    return NextResponse.json(updatedTaxReturn);
  } catch (_error) =>
    console.error('Error updating dependents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
