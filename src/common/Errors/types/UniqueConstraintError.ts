import { ConflictError } from './ConflictError';
import { PrismaClientError } from './PrismaClientError.type';
export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientError) {
    const uniqueField = e.meta.target;
    super(`a record with this ${uniqueField} already exists`);
  }
}
