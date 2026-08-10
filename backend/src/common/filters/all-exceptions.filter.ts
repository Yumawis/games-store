import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorResponseBody {
  message: string;
  error?: string;
  errors?: Record<string, string>;
  statusCode?: number;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let body: ErrorResponseBody = {
      message: 'Error interno del servidor',
      error: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionRes = exception.getResponse();

      if (typeof exceptionRes === 'string') {
        body = { message: exceptionRes };
      } else if (typeof exceptionRes === 'object' && exceptionRes !== null) {
        const res = exceptionRes as Record<string, unknown>;
        body = {
          message:
            this.stringify(res['message'], 'Error occurred') ?? 'Error',
          error: this.stringify(res['error']),
          errors:
            typeof res['errors'] === 'object' && res['errors'] !== null
              ? (res['errors'] as Record<string, string>)
              : undefined,
        };
      }
    } else if (exception instanceof Error) {
      body = {
        message: 'Error interno del servidor',
        error: exception.message,
      };
      this.logger.error(exception.message, exception.stack);
    }

    response.status(status).json({ data: body });
  }

  private stringify(value: unknown, fallback?: string): string | undefined {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join(', ');
    if (fallback) return fallback;
    return undefined;
  }
}