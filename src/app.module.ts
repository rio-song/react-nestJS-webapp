import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment/comment.controller';
import { FavoController } from './controller/favo/favo.controller';
import { PostController } from './controller/post/post.controller';

@Module({
  imports: [],
  controllers: [PostController, CommentController, FavoController],
})
export class AppModule { }
