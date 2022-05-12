import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PutUserRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly id!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly firstName!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly familyName!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly nickName!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly imageUrl!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly email!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly password!: string
}
