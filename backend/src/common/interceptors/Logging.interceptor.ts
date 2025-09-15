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
    const { method, url } = req;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse<Response>();
        const statusCode = res.statusCode;
        const duration = Date.now() - startTime;

        if (statusCode >= 400) {
          this.logger.error(
            `\x1b[31m${method} ${url} ${statusCode} - ${duration}ms\x1b[0m`,
          );
        } else if (statusCode >= 300) {
          this.logger.warn(
            `\x1b[33m${method} ${url} ${statusCode} - ${duration}ms\x1b[0m`,
          );
        } else {
          this.logger.log(`${method} ${url} ${statusCode} - ${duration}ms`);
        }
      }),
      catchError((err: HttpException) => {
        const res = context.switchToHttp().getResponse<Response>();
        const duration = Date.now() - startTime;
        console.info('This is the res of the exception', res);

        // red text for exceptions
        this.logger.error(
          `\x1b[31m${method} ${url} 500 - ${duration}ms\x1b[0m`,
          err.stack,
        );

        return throwError(() => err);
      }),
    );
  }
}
