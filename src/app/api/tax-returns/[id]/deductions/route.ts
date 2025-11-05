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
import { DeductionCategory } from '@prisma/client';

interface DeductionInput {
  category: DeductionCategory;
  description: string;
  amount: number;
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
    const { deductions, useStandardDeduction } = data;

    // Delete existing deductions
    await prisma.deduction.deleteMany({
      where: { taxReturnId: params.id },
    });

    // Create new deductions if not using standard deduction
    if (!useStandardDeduction && deductions.length > 0) {
      await prisma.deduction.createMany({
        data: deductions.map((deduction: DeductionInput) => ({
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
        status: 'IN_PROGRESS' as const,
      },
    });

    return NextResponse.json(updatedTaxReturn);
  } catch (error) {
    console.error('Error updating deductions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
