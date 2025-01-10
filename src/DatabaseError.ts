export class DatabaseError extends Error {
  public code: string;
  public details: string;

  constructor(message: string, code: string, details: string) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
