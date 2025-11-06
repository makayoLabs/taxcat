import AWS from 'aws-sdk';
import { captureError } from '../monitoring/sentry';
import { v4 as uuidv4 } from 'uuid';

interface DocumentMetadata {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  category: string;
  taxYear?: number;
  clientId?: string;
  returnId?: string;
}

interface DocumentUploadOptions {
  category: string;
  tags?: string[];
  taxYear?: number;
  clientId?: string;
  returnId?: string;
}

export class DocumentManager {
  private s3: AWS.S3;
  private bucket: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    this.bucket = process.env.AWS_S3_BUCKET!;
  }

  private generateKey(metadata: DocumentMetadata): string {
    const year = metadata.taxYear ? `${metadata.taxYear}/` : '';
    const client = metadata.clientId ? `${metadata.clientId}/` : '';
    const category = `${metadata.category}/`;
    return `${year}${client}${category}${metadata.id}-${metadata.originalName}`;
  }

  public async uploadDocument(
    file: Buffer,
    fileName: string,
    mimeType: string,
    userId: string,
    options: DocumentUploadOptions
  ): Promise<DocumentMetadata> {
    try {
      const metadata: DocumentMetadata = {
        id: uuidv4(),
        originalName: fileName,
        mimeType,
        size: file.length,
        uploadedBy: userId,
        uploadedAt: new Date(),
        tags: options.tags || [],
        category: options.category,
        taxYear: options.taxYear,
        clientId: options.clientId,
        returnId: options.returnId,
      };

      const key = this.generateKey(metadata);

      await this.s3
        .putObject({
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: mimeType,
          Metadata: {
            'document-id': metadata.id,
            'uploaded-by': userId,
            'original-name': fileName,
            category: options.category,
            tags: JSON.stringify(options.tags || []),
          },
        })
        .promise();

      return metadata;
    } catch (error) {
      captureError(error as Error, {
        service: 'DOCUMENT_UPLOAD',
        fileName,
        userId,
        category: options.category,
      });
      throw new Error('Failed to upload document');
    }
  }

  public async downloadDocument(documentId: string): Promise<Buffer> {
    try {
      const response = await this.s3
        .getObject({
          Bucket: this.bucket,
          Key: documentId,
        })
        .promise();

      return response.Body as Buffer;
    } catch (error) {
      captureError(error as Error, {
        service: 'DOCUMENT_DOWNLOAD',
        documentId,
      });
      throw new Error('Failed to download document');
    }
  }

  public async deleteDocument(documentId: string): Promise<void> {
    try {
      await this.s3
        .deleteObject({
          Bucket: this.bucket,
          Key: documentId,
        })
        .promise();
    } catch (error) {
      captureError(error as Error, {
        service: 'DOCUMENT_DELETE',
        documentId,
      });
      throw new Error('Failed to delete document');
    }
  }

  public async listDocuments(
    clientId?: string,
    category?: string,
    taxYear?: number
  ): Promise<DocumentMetadata[]> {
    try {
      let prefix = '';
      if (taxYear) {
        prefix += `${taxYear}/`;
      }
      if (clientId) {
        prefix += `${clientId}/`;
      }
      if (category) {
        prefix += `${category}/`;
      }

      const response = await this.s3
        .listObjectsV2({
          Bucket: this.bucket,
          Prefix: prefix,
        })
        .promise();

      const documents: DocumentMetadata[] = [];
      for (const object of response.Contents || []) {
        const metadata = await this.s3
          .headObject({
            Bucket: this.bucket,
            Key: object.Key!,
          })
          .promise();

        documents.push({
          id: metadata.Metadata!['document-id'],
          originalName: metadata.Metadata!['original-name'],
          mimeType: metadata.ContentType!,
          size: object.Size!,
          uploadedBy: metadata.Metadata!['uploaded-by'],
          uploadedAt: object.LastModified!,
          tags: JSON.parse(metadata.Metadata!.tags || '[]'),
          category: metadata.Metadata!.category,
          taxYear: taxYear,
          clientId: clientId,
        });
      }

      return documents;
    } catch (error) {
      captureError(error as Error, {
        service: 'DOCUMENT_LIST',
        clientId,
        category,
        taxYear,
      });
      throw new Error('Failed to list documents');
    }
  }

  public async generatePresignedUrl(
    documentId: string,
    expiresInSeconds: number = 3600
  ): Promise<string> {
    try {
      const url = await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucket,
        Key: documentId,
        Expires: expiresInSeconds,
      });

      return url;
    } catch (error) {
      captureError(error as Error, {
        service: 'DOCUMENT_PRESIGNED_URL',
        documentId,
      });
      throw new Error('Failed to generate presigned URL');
    }
  }
}
