import { ApiProperty } from '@nestjs/swagger'

export class PostPutUserResponse {
    User: User

    public constructor(userId: string) {
        this.User = new User({ userId: userId }
        )
    }
}

class User {
    @ApiProperty()
    userId: string

    public constructor(params: {
        userId: string
    }) {
        this.userId = params.userId
    }
}
