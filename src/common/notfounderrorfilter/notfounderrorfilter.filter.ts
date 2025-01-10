import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class NotfounderrorfilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
  }
}
