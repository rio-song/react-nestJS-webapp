import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create(AppModule);
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'https://www.rioswebapp.tk');
    res.header('Access-Control-Allow-Headers', 'Origin, token, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS, POST, DELETE');
    res.header('Access-Control-Max-Age', '2000');

    if ('OPTIONS' === req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  });

  const config = new DocumentBuilder()
    .setTitle('IF仕様書')
    // .setDescription('')
    .setVersion('1.0')
    .addTag('ログイン')
    .addTag('ログアウト')
    .addTag('ユーザー機能')
    .addTag('投稿機能')
    .addTag('コメント機能')
    .addTag('お気に入り機能')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(8000);
}
bootstrap();