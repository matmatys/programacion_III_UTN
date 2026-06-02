import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseBuilder } from './response-builder';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    if (host.getType() !== 'http') {
      return;
    }

    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<{ method?: string; url?: string }>();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = this.extractMessage(exception);
    const messageCode = this.resolveMessageCode(statusCode);

    this.logger.error(`${statusCode} ${request.method || 'UNKNOWN'} ${request.url || ''} - ${message}`);

    const responseBody = new ResponseBuilder().buildErrorResponse(message, messageCode);
    httpAdapter.reply(response, responseBody, statusCode);
  }

  private extractMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'string') {
        return response;
      }

      if (response && typeof response === 'object') {
        const typedResponse = response as { message?: unknown };

        if (Array.isArray(typedResponse.message)) {
          return typedResponse.message.join(', ');
        }

        if (typeof typedResponse.message === 'string') {
          return typedResponse.message;
        }
      }

      return exception.message || 'Unexpected error';
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Unexpected error';
  }

  private resolveMessageCode(statusCode: number): string {
    if (statusCode === HttpStatus.BAD_REQUEST) return '4000';
    if (statusCode === HttpStatus.UNAUTHORIZED) return '4010';
    if (statusCode === HttpStatus.FORBIDDEN) return '4030';
    if (statusCode === HttpStatus.NOT_FOUND) return '4040';
    if (statusCode === HttpStatus.CONFLICT) return '4090';
    return '5000';
  }
}

