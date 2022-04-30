// @see https://docs.nestjs.com/openapi/types-and-parameters

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class GetAllPostsRequest {
    @ApiProperty()
    @IsNotEmpty()
    readonly count!: number

    @ApiProperty()
    @IsNotEmpty()
    readonly lastPostId!: string
}
