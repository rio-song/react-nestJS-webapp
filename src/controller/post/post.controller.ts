import { Body, Controller, Get, Post, Put, Param, Request } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetPostsAllRequest } from './request/get-posts-all-request'
import { PutUserRequest } from './request/put-user-request'
import { GetPostsAllResponse } from './response/get-posts-all-response'
import { GetPostsAllUseCase } from 'src/app/post/usecase/get-posts-all-usecase'
import { GetPostsUserAllUseCase } from 'src/app/post/usecase/get-posts-user-all-usecase'
// import { PostUserUseCase } from '../app/user-usecase/post-user-usecase'
// import { PutUserUseCase } from '../app/user-usecase/put-user-usecase'
// import { UserRepository } from 'src/infra/db/repository/user-repository'
// import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { PostQS } from 'src/infra/post/post-qs'


@Controller({
    path: 'api/post',
})
export class PostController {
    @Get()
    async getAllPosts(@Body() getAllPostsDto: GetPostsAllRequest): Promise<GetPostsAllResponse> {
        const prisma = new PrismaClient()
        const qs = new PostQS(prisma)
        const usecase = new GetPostsAllUseCase(qs)
        const result = await usecase.do({
            count: getAllPostsDto.count,
            lastPostId: getAllPostsDto.lastPostId
        })
        const response = new GetPostsAllResponse({ Posts: result })
        return response
    }
    @Get(':userId')
    async getUserAllPosts(@Body() getAllPostsDto: GetPostsAllRequest, @Param() param): Promise<GetPostsAllResponse> {
        const prisma = new PrismaClient()
        const qs = new PostQS(prisma)
        const usecase = new GetPostsUserAllUseCase(qs)
        const result = await usecase.do({
            userId: param.userId,
            count: getAllPostsDto.count,
            lastPostId: getAllPostsDto.lastPostId
        })
        const response = new GetPostsAllResponse({ Posts: result })
        return response
    }



    // @Post()
    // async postUser(
    //     @Param() userId: string,
    //     @Body() postUserDto: PostUserRequest,
    // ): Promise<void> {
    //     const userId2 = request.params[userId]
    //     const prisma = new PrismaClient()
    //     const userRepo = new UserRepository(prisma)
    //     const teamRepo = new TeamRepository(prisma)
    //     const usecase = new PostUserUseCase(userRepo, teamRepo)
    //     await usecase.do({
    //         lastName: postUserDto.lastName,
    //         firstName: postUserDto.firstName,
    //         email: postUserDto.email,
    //         userStatus: postUserDto.userStatus,
    //     })
    // }

    // @Put()
    // async putUser(
    //     @Body() putUserDto: PutUserRequest,
    // ): Promise<void> {
    //     const prisma = new PrismaClient()
    //     const repoUser = new UserRepository(prisma)
    //     const teamRepo = new TeamRepository(prisma)
    //     const userQS = new UserQS(prisma)
    //     const usecase = new PutUserUseCase(userQS, repoUser, teamRepo)
    //     await usecase.do({
    //         lastName: putUserDto.lastName,
    //         firstName: putUserDto.firstName,
    //         email: putUserDto.email,
    //         userStatus: putUserDto.userStatus,
    //     })
    // }

}
