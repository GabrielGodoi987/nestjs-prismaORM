import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilterFilter } from './common/http-exception-filter/http-exception-filter.filter';
import { UnAuthorizedInterceptor } from './common/Errors/interceptors/UnAuthorized.interceptor';
import { NotFoundErrorInterceptor } from './common/Errors/interceptors/NotFoundError.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  //app.useGlobalFilters(new HttpExceptionFilterFilter());

  app.useGlobalInterceptors(new NotFoundErrorInterceptor());
  
  app.useGlobalInterceptors(new UnAuthorizedInterceptor());


  const docs = new DocumentBuilder()
    .setTitle('PirsmaAPI')
    .setDescription('Prisma api project')
    .addTag('Prisma')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
