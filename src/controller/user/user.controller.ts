import { Body, Controller, Get, Post, Put, Param, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { UserQS } from 'src/infra/user/user-qs'
import { PutUserUseCase } from 'src/app/user/usecase/put-user-usecase'
import { UserRepository } from 'src/infra/user/user-repository'
import { GetUserResponse } from './response/get-user-response'
import { GetUserUseCase } from 'src/app/user/usecase/get-user-usecase'
import { PutUserRequest } from './request/put-user-request'
import { PostUserUseCase } from 'src/app/user/usecase/post-user-usecase'
import { PostUserRequest } from './request/post-user-request'
import { PostPutUserResponse } from './response/post-put-user-response'

@Controller({
    path: 'api/user',
})
export class UserController {
    @Get('/userId/:userId')
    async getUser(
        @Param() userId: string,
        @Headers('token') token: string,
    ): Promise<GetUserResponse> {
        const prisma = new PrismaClient()
        const qs = new UserQS(prisma)
        const usecase = new GetUserUseCase(qs)
        const result = await usecase.do(userId, token)
        const response = new GetUserResponse({ Users: result })
        return response
    }

    @Post()
    async postUser(
        @Body() postUserDto: PostUserRequest,
    ): Promise<PostPutUserResponse> {
        const prisma = new PrismaClient()
        const userRepo = new UserRepository(prisma)
        const usecase = new PostUserUseCase(userRepo)
        const result = await usecase.do({
            firstName: postUserDto.firstName,
            familyName: postUserDto.familyName,
            nickName: postUserDto.nickName,
            imageUrl: postUserDto.imageUrl,
            email: postUserDto.email,
            password: postUserDto.password,
        })
        const response = new PostPutUserResponse(result)
        return response
    }

    @Put('/userId/:userId')
    async putUser(
        @Param('userId') userId: string,
        @Headers('token') token: string,
        @Body() putUserDto: PutUserRequest,
    ): Promise<PostPutUserResponse> {
        const prisma = new PrismaClient()
        const userRepo = new UserRepository(prisma)
        const usecase = new PutUserUseCase(userRepo)
        const result = await usecase.do({
            token: token,
            userId: userId,
            firstName: putUserDto.firstName,
            familyName: putUserDto.familyName,
            nickName: putUserDto.nickName,
            imageUrl: putUserDto.imageUrl,
            email: putUserDto.email,
            password: putUserDto.password,
        })
        const response = new PostPutUserResponse(result)
        return response
    }


}
