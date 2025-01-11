import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { PostQuery } from '../dto/post-query.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneByName(name: string) {
    return await this.prismaService.post.findFirst({
      where: {
        title: name,
      },
    });
  }

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.prismaService.post.create({
      data: createPostDto,
    });
  }
  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }
  async findOne(id: number): Promise<PostEntity> {
    return await this.prismaService.post.findFirst({
      where: {
        id,
      },
    });
  }
  async findAll(): Promise<PostEntity[]> {
    return await this.prismaService.post.findMany({
      include: {
        author: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.post.delete({
      where: {
        id,
      },
    });
  }
}
