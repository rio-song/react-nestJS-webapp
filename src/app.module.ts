import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment/comment.controller';
import { FavoController } from './controller/favo/favo.controller';
import { PostController } from './controller/post/post.controller';
import { UserController } from './controller/user/user.controller';
import { LoginController } from './controller/login/login.controller';
import { LogoutController } from './controller/logout/logout.controller';
//import { AllExceptionsFilter } from './controller/error';

@Module({
  imports: [],
  controllers: [PostController, CommentController, FavoController, UserController, LoginController, LogoutController],
})
export class AppModule { }
