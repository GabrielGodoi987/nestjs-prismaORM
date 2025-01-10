import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseError } from '../types/DatabaseError';
import { catchError, Observable } from 'rxjs';
import { isPrismaError } from 'src/common/utils/is-prisma-error.util';
import e from 'express';
import { handleDatabaseErrors } from 'src/common/utils/handle-database-errors.util';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }
        if (error instanceof DatabaseError) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
