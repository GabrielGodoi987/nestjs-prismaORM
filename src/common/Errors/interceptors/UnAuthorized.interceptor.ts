import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { error } from 'console';
import { catchError, Observable } from 'rxjs';
import { UnAuthorizedError } from '../types/UnAuthorizedError';

@Injectable()
export class UnAuthorizedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof UnAuthorizedError) {
          throw new UnAuthorizedError(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
