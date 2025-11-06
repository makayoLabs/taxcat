import { S3 } from 'aws-sdk';
import { DocumentType } from '@prisma/client';
import { createHash } from 'crypto';

interface UploadResult {
  url: string;
  key: string;
}

export class DocumentUploadService {
  private s3: S3;
  private bucket: string;

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.bucket = process.env.AWS_S3_BUCKET || '';
  }

  private generateKey(userId: string, fileName: string): string {
    const timestamp = Date.now();
    const hash = createHash('sha256')
      .update(`${userId}-${fileName}-${timestamp}`)
      .digest('hex')
      .slice(0, 8);
    return `documents/${userId}/${hash}-${fileName}`;
  }

  private async validateFile(file: Buffer, mimeType: string, size: number): Promise<void> {
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/heic',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (size > MAX_SIZE) {
      throw new Error('File size exceeds maximum limit of 10MB');
    }

    if (!ALLOWED_TYPES.includes(mimeType)) {
      throw new Error('File type not supported');
    }
  }

  public async uploadDocument(
    file: Buffer,
    fileName: string,
    mimeType: string,
    userId: string,
    type: DocumentType
  ): Promise<UploadResult> {
    await this.validateFile(file, mimeType, file.length);

    const key = this.generateKey(userId, fileName);
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: mimeType,
      Metadata: {
        userId,
        documentType: type,
      },
      ServerSideEncryption: 'AES256',
    };

    try {
      await this.s3.putObject(params).promise();

      const url = this.s3.getSignedUrl('getObject', {
        Bucket: this.bucket,
        Key: key,
        Expires: 60 * 60, // 1 hour
      });

      return { url, key };
    } catch (error) {
      console.error('Error uploading document to S3:', error);
      throw new Error('Failed to upload document');
    }
  }

  public async deleteDocument(key: string): Promise<void> {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      await this.s3.deleteObject(params).promise();
    } catch (error) {
      console.error('Error deleting document from S3:', error);
      throw new Error('Failed to delete document');
    }
  }

  public async getSignedUrl(key: string): Promise<string> {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: 60 * 60, // 1 hour
    });
  }
}
