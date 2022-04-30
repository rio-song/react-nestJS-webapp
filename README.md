<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /><a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# API

- 全ユーザーの投稿の全量の取得
get /api/post<br><br>

requestBody:count(取得したい数)/lastPostId(指定したいカーソル)<br>
responseBody:id/imageUrl/title/posted_at/Favos数/Comments数/lastPostId(指定したいカーソル)<br>

- あるユーザーの投稿の全量の取得
get /api/post/{userId}<br><br>

requestBody:none<br>
responseBody:id/imageUrl/title/posted_at/Favos数/Comments数<br>


- 投稿の詳細の取得
get /api/post/{postId}<br><br>

requestBody:none<br>
responseBody:id/imageUrl/title/text/posted_at/Favos数/Comments数/Commentのリスト/Commentした人<br>

- 投稿
post /api/post/{userId}<br><br>

requestBody:imageUrl/title/text<br>
responseBody:none<br>

- 投稿の削除
delete /api/post/{postId}/{userId}<br><br>
requestBody:none<br>
responseBody:none<br>

- 投稿の編集
put /api/post/{postId}/{userId}<br><br>
requestBody:imageUrl/title/text<br>
responseBody:none<br>

- いいねの登録
post /api/favo/{postId}/{userId}<br><br>
requestBody:none<br>
responseBody:none<br>

- いいねの削除
delete /api/favo/{postId}/{userId}<br><br>
requestBody:none<br>
responseBody:none<br>

- コメントの登録
post /api/comment/{postId}/{userId}<br><br>
requestBody:comment<br>
responseBody:none<br>

- コメントの削除
delete /api/comment/{postId}/{userId}<br><br>
requestBody:none<br>
responseBody:none<br>

- コメントの編集
put /api/comment/{postId}/{userId}<br><br>
requestBody:comment<br>
responseBody:none<br>