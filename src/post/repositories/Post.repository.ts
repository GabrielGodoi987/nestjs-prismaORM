import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Prisma } from '@prisma/client';

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
    const { authorEmail } = createPostDto;
    delete createPostDto.authorEmail;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundException("This user doesn't exists");
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return await this.prismaService.post.create({
      data,
    });
  }
  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prismaService.post.update({
        data: updatePostDto,
        where: { id },
      });
    }

    delete updatePostDto.authorEmail;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundException('Author not found');
    }

    const data: Prisma.PostUpdateInput = {
      ...CreatePostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  async findOne(id: number): Promise<PostEntity> {
    return await this.prismaService.post.findFirst({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }
  async findAll(): Promise<PostEntity[]> {
    return await this.prismaService.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
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
