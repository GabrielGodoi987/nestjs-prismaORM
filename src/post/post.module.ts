import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './repositories/Post.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
})
export class PostModule {}
