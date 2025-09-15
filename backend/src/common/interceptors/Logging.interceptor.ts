import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url, body } = req;
    const startTime = Date.now();

    // Only log body for POST/PUT/PATCH requests
    const bodyToLog =
      ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && body
        ? JSON.stringify({ ...body, password: '[REDACTED]' })
        : '';

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;
        const duration = Date.now() - startTime;

        // Color-coded logging
        let message = `${method} ${url} ${statusCode} - ${duration}ms`;
        if (bodyToLog) message += ` | Body: ${bodyToLog}`;

        if (statusCode >= 500) {
          this.logger.error(`\x1b[31m${message}\x1b[0m`); // red
        } else if (statusCode >= 400) {
          this.logger.warn(`\x1b[33m${message}\x1b[0m`); // yellow
        } else if (statusCode >= 300) {
          this.logger.log(`\x1b[36m${message}\x1b[0m`); // cyan for redirects
        } else {
          this.logger.log(`\x1b[32m${message}\x1b[0m`); // green for success
        }
      }),
      catchError((err: HttpException) => {
        const duration = Date.now() - startTime;
        const message = `${method} ${url} 500 - ${duration}ms | Error: ${err.message}`;

        this.logger.error(`\x1b[31m${message}\x1b[0m`, err.stack);

        return throwError(() => err);
      }),
    );
  }
}
