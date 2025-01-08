import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserReporitory {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
