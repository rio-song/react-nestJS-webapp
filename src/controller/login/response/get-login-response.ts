import { ApiProperty } from '@nestjs/swagger'

export class GetLoginResponse {
    Login: Login

    public constructor(params: { userId: string, token: string }) {
        this.Login = new Login({
            userId: params.userId,
            token: params.token
        })
    }
}

class Login {
    @ApiProperty()
    userId: string

    @ApiProperty()
    token: string

    public constructor(params: {
        userId: string
        token: string
    }) {
        this.userId = params.userId
        this.token = params.token
    }
}
