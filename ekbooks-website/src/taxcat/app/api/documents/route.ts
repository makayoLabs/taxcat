import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(): Promise<NextResponse> {
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
  } catch (_error) =>
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse> {
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
  } catch (_error) =>
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
