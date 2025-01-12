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
      include: {
        Post: {
          select: {
            title: true,
            content: true,
            created_at: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany({
      include: {
        Post: {
          select: {
            title: true,
            content: true,
            created_at: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: {
        Post: {
          select: {
            title: true,
            content: true,
            created_at: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.update({
      where: { id },
      data,
      include: {
        Post: {
          select: {
            title: true,
            content: true,
            created_at: true,
          },
        },
      },
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
