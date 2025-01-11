import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './repositories/Post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRespository: PostRepository) {}
  async create(createPostDto: CreatePostDto) {
    const post = await this.postRespository.findOneByName(createPostDto.title);
    if (!!post) {
      throw new ConflictException('This post already exists');
    }

    return await this.postRespository.create(createPostDto);
  }

  async findAll() {
    return await this.postRespository.findAll();
  }

  async findOne(id: number) {
    return await this.postRespository.findOne(id);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRespository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRespository.remove(id);
  }
}
