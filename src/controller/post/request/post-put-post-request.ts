import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PostPutUserRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly title!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly text!: string

    @ApiProperty()
    @IsNotEmpty()
    readonly imageUrl!: string
}
