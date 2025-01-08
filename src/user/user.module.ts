import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserReporitory } from './repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserReporitory],
})
export class UserModule {}
