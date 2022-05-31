import { ApiProperty } from '@nestjs/swagger'
import { UserDTO } from 'src/app/user/user-qs-if'

export class GetUserResponse {
    User: User

    public constructor(params: { Users: UserDTO }) {
        const { Users } = params
        this.User = new User({
            id: Users.id,
            firstName: Users.firstName,
            familyName: Users.familyName,
            nickName: Users.nickName,
            imageUrl: Users.imageUrl,
            email: Users.email,
            profileText: Users.password,
            registeredAt: Users.registeredAt,
        })
    }
}

class User {
    @ApiProperty()
    id: string

    @ApiProperty()
    firstName: string

    @ApiProperty()
    familyName: string

    @ApiProperty()
    nickName: string

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    email: string

    @ApiProperty()
    profileText: string

    @ApiProperty()
    registeredAt: Date

    public constructor(params: {
        id: string
        firstName: string
        familyName: string
        nickName: string
        imageUrl: string
        email: string
        profileText: string
        registeredAt: Date
    }) {
        this.id = params.id
        this.firstName = params.firstName
        this.familyName = params.familyName
        this.nickName = params.nickName
        this.imageUrl = params.imageUrl
        this.nickName = params.nickName
        this.email = params.email
        this.registeredAt = params.registeredAt
    }
}
