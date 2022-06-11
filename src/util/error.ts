import { HttpException, HttpStatus } from '@nestjs/common'


export class UnauthorizedException extends HttpException {
    constructor() {
        super('認証エラーが発生しました。', HttpStatus.UNAUTHORIZED);
    }
}
export class BadRequestException extends HttpException {
    constructor() {
        super('入力に誤りがあります。', HttpStatus.BAD_REQUEST);
    }
}
export class BadRequestEmailException extends HttpException {
    constructor() {
        super('メールアドレスが重複しています。', HttpStatus.BAD_REQUEST);
    }
}

export class NotFoundException extends HttpException {
    constructor() {
        super('メールアドレス・パスワードが間違っているか、存在しないアカウントです。', HttpStatus.NOT_FOUND);
    }
}

export class InternalServerErrorException extends HttpException {
    constructor() {
        super('予期せぬエラーが発生しました。', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
