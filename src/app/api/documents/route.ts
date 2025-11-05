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

    const documents = await prisma.document.findMany({
      where: { userId: user.id },
      orderBy: { uploadDate: 'desc' },
      select: {
        id: true,
        name: true,
        type: true,
        uploadDate: true,
        url: true,
      },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { name, type, url, taxReturnId } = data;

    const document = await prisma.document.create({
      data: {
        name,
        type,
        url,
        userId: user.id,
        taxReturnId,
        uploadDate: new Date(),
        fileSize: 0, // This should be calculated from the actual file
        mimeType: 'application/pdf', // This should be determined from the actual file
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
