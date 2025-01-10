import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { DatabaseError } from './DatabaseError';
import { catchError, Observable } from 'rxjs';

export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        throw new DatabaseError('Database error', 'DB_ERR_001', error.message);
      }),
    );
  }
}
