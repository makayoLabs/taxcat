import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';
import { DocumentType } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { withErrorHandler, createSuccessResponse, unauthorized, badRequest } from '@/lib/api-utils';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest): void {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw unauthorized();
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw unauthorized();
    }

    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files.length) {
      throw badRequest('No files uploaded');
    }

    const uploadedDocuments = await Promise.all(
      files.map(async (___file: any) => {
        if (!file || !file.size) {
          throw badRequest('Invalid file');
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          throw badRequest('Invalid file type');
        }

        if (file.size > MAX_FILE_SIZE) {
          throw badRequest('File size too large');
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const key = `${user.id}/${uuidv4()}-${file.name}`;

        const uploadResult = await s3
          .upload({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key: key,
            Body: buffer,
            ContentType: file.type,
            ACL: 'private',
          })
          .promise();

        const document = await prisma.document.create({
          data: {
            userId: user.id,
            name: file.name,
            type: file.type.includes('pdf')
              ? DocumentType.TAX_DOCUMENT
              : file.type.includes('image')
                ? DocumentType.RECEIPT
                : DocumentType.OTHER,
            url: uploadResult.Location,
            fileSize: file.size,
            mimeType: file.type,
          },
        });

        return document;
      })
    );

    return createSuccessResponse(uploadedDocuments, 201);
  });
}

export async function OPTIONS(): void {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
