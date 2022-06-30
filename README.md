## 構成
- Node.js(v18.0.0)
- フレームワーク：[NestJS](https://nestjs.com/)(v8.1.3)
- ORM：[prisma](https://www.prisma.io/)(v3.13.3)
- DB：postgreSQL


## APIのIF仕様書(Swagger)
https://api.rioswebapp.tk/api/

## アプリ全体設計書
https://www.notion.so/8a50cb6d25c144df92c897d69c057ed6

## Installation

```bash
$ npm install
```
prismaのマイグレ
```bash
$ npm prisma generate
$ npm prisma migrate dev --name init --preview-feature
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

