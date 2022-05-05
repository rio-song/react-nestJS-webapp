import { Body, Controller, Get, Post, Put, Param, Request, Delete } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetPostsAllRequest } from './request/get-posts-all-request'
import { GetPostsAllResponse } from './response/get-posts-all-response'
import { GetPostDetailResponse } from './response/get-post-detail-response'
import { GetPostsAllUseCase } from 'src/app/post/usecase/get-posts-all-usecase'
import { GetPostsUserAllUseCase } from 'src/app/post/usecase/get-posts-user-all-usecase'
import { GetPostDetailUseCase } from 'src/app/post/usecase/get-post-detail-usecase'
import { PostQS } from 'src/infra/post/post-qs'
import { PostDetailQS } from 'src/infra/post/post-detail-qs'
import { PostPutUserRequest } from './request/post-put-post-request'
import { PostPostUseCase } from 'src/app/post/usecase/post-post-usecase'
import { PutPostUseCase } from 'src/app/post/usecase/put-post-usecase'
import { DeletePostUseCase } from 'src/app/post/usecase/delete-post-usecase'
import { PostRepository } from 'src/infra/post/post-repository'

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
    @Get('/userId/:userId')
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

    @Get('/postId/:postId')
    async getPostDetail(@Param() param): Promise<GetPostDetailResponse> {
        const prisma = new PrismaClient()
        const qs = new PostDetailQS(prisma)
        const usecase = new GetPostDetailUseCase(qs)
        const result = await usecase.do({
            postId: param.postId
        })
        const response = new GetPostDetailResponse({ PostDetails: result })
        return response
    }


    @Post('/userId/:userId')
    async postUser(
        @Param() userId: string,
        @Body() postUserDto: PostPutUserRequest,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new PostPostUseCase(postRepo)
        await usecase.do({
            userId: userId,
            imageUrl: postUserDto.imageUrl,
            title: postUserDto.title,
            text: postUserDto.text,
        })
    }

    @Put('/userId/:userId/postId/:postId')
    async putUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Body() putUserDto: PostPutUserRequest,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new PutPostUseCase(postRepo)
        await usecase.do({
            userId: userId,
            postId: postId,
            imageUrl: putUserDto.imageUrl,
            title: putUserDto.title,
            text: putUserDto.text,
        })
    }


    @Delete('/userId/:userId/postId/:postId')
    async deletePost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new DeletePostUseCase(postRepo)
        await usecase.do({
            userId: userId,
            postId: postId
        })
    }
}
