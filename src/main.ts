import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UnAuthorizedInterceptor } from './common/Errors/interceptors/UnAuthorized.interceptor';
import { NotFoundErrorInterceptor } from './common/Errors/interceptors/NotFoundError.interceptor';
import { DatabaseInterceptor } from './common/Errors/interceptors/Database.interceptor';
import { ConflictErrorInterceptor } from './common/Errors/interceptors/conflict-error.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const docs = new DocumentBuilder()
    .setTitle('PirsmaAPI')
    .setDescription('Prisma api project')
    .addTag('Prisma')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('docs', app, documentFactory);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new ConflictErrorInterceptor(),
    new DatabaseInterceptor(),
    new NotFoundErrorInterceptor(),
    new UnAuthorizedInterceptor(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
