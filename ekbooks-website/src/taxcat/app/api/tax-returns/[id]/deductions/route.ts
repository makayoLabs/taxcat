import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { DeductionCategory } from '@prisma/client';

interface DeductionInput {
  category: DeductionCategory;
  description: string;
  amount: number;
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
    const { deductions, useStandardDeduction } = data;

    // Delete existing deductions
    await prisma.deduction.deleteMany({
      where: { taxReturnId: params.id },
    });

    // Create new deductions if not using standard deduction
    if (!useStandardDeduction && deductions.length > 0) {
      await prisma.deduction.createMany({
        data: deductions.map((___deduction: DeductionInput) => ({
          taxReturnId: params.id,
          category: deduction.category,
          description: deduction.description,
          amount: deduction.amount,
        })),
      });
    }

    // Update tax return
    const updatedTaxReturn = await prisma.taxReturn.update({
      where: { id: params.id },
      data: {
        hasDeductions: !useStandardDeduction && deductions.length > 0,
        status: 'IN_PROGRESS' as const,
      },
    });

    return NextResponse.json(updatedTaxReturn);
  } catch (_error) =>
    console.error('Error updating deductions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
