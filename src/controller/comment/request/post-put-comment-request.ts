
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class PostPutCommentRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly comment!: string
}
