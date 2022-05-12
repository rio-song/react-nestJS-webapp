import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment/comment.controller';
import { FavoController } from './controller/favo/favo.controller';
import { PostController } from './controller/post/post.controller';
import { UserController } from './controller/user/user.controller';
import { LoginController } from './controller/login/login.controller';

@Module({
  imports: [],
  controllers: [PostController, CommentController, FavoController, UserController, LoginController],
})
export class AppModule { }
