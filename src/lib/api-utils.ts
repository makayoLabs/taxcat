import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
};

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function createSuccessResponse<T>(data: T, status: number = 200): NextResponse {
  const response: ApiResponse<T> = {
    success: true,
    data,
  };
  return NextResponse.json(response, { status });
}

export function createErrorResponse(
  error: unknown,
  defaultMessage: string = 'Internal server error'
): NextResponse {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Validation error',
          code: 'VALIDATION_ERROR',
          details: error.errors,
        },
      },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let statusCode = 500;
    let message = defaultMessage;

    switch (error.code) {
      case 'P2002':
        statusCode = 409;
        message = 'A record with this value already exists';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Record not found';
        break;
      case 'P2003':
        statusCode = 400;
        message = 'Invalid foreign key constraint';
        break;
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message,
          code: error.code,
          details: error.meta,
        },
      },
      { status: statusCode }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        message: defaultMessage,
        code: 'INTERNAL_SERVER_ERROR',
      },
    },
    { status: 500 }
  );
}

export async function withErrorHandler(
  handler: () => Promise<NextResponse>,
  defaultErrorMessage: string = 'Internal server error'
): Promise<NextResponse> {
  try {
    return await handler();
  } catch (error) {
    return createErrorResponse(error, defaultErrorMessage);
  }
}

export function unauthorized(message: string = 'Unauthorized'): ApiError {
  return new ApiError(message, 401, 'UNAUTHORIZED');
}

export function forbidden(message: string = 'Forbidden'): ApiError {
  return new ApiError(message, 403, 'FORBIDDEN');
}

export function notFound(message: string = 'Not found'): ApiError {
  return new ApiError(message, 404, 'NOT_FOUND');
}

export function badRequest(message: string = 'Bad request'): ApiError {
  return new ApiError(message, 400, 'BAD_REQUEST');
}
