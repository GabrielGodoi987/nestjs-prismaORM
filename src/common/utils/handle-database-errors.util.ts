import { PrismaErrors } from '../enums/PrismaErrors.enum';
import { DatabaseError } from '../Errors/types/DatabaseError';
import { PrismaClientError } from '../Errors/types/PrismaClientError.type';
import { UniqueConstraintError } from '../Errors/types/UniqueConstraintError';

export const handleDatabaseErrors = (e: PrismaClientError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default:
      return new DatabaseError(e.message);
  }
};
