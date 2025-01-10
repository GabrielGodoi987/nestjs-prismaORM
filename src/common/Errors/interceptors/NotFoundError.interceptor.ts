import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { NotFoundError } from '../types/NotFoundError';

@Injectable()
export class NotFoundErrorInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundError(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
