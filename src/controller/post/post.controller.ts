import { Body, Controller, Get, Post, Put, Param, Headers, Delete, HttpException, HttpStatus } from '@nestjs/common'
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
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'

@Controller({
    path: 'api/post',
})
export class PostController {
    @Get('/userId/:userId')
    async getAllPosts(
        @Body() getAllPostsDto: GetPostsAllRequest,
        @Param() param,
        @Headers('token') token: string | null,
    ): Promise<GetPostsAllResponse> {
        const prisma = new PrismaClient()
        const qs = new PostQS(prisma)
        const usecase = new GetPostsAllUseCase(qs)
        try {
            const result = await usecase.do({
                token: token,
                userId: param.userId,
                count: getAllPostsDto.count,
                lastPostId: getAllPostsDto.lastPostId
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            const response = new GetPostsAllResponse({ Posts: result })
            return response
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }
    @Get('/user/userId/:userId')
    async getUserAllPosts(
        @Body() getAllPostsDto: GetPostsAllRequest,
        @Param() param,
        @Headers('token') token: string,
    ): Promise<GetPostsAllResponse> {
        const prisma = new PrismaClient()
        const qs = new PostQS(prisma)
        const usecase = new GetPostsUserAllUseCase(qs)
        try {
            const result = await usecase.do({
                token: token,
                userId: param.userId,
                count: getAllPostsDto.count,
                lastPostId: getAllPostsDto.lastPostId
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            const response = new GetPostsAllResponse({ Posts: result })
            return response
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }

    @Get('/postId/:postId/userId/:userId')
    async getPostDetail(
        @Param() param,
        @Headers('token') token: string,
    ): Promise<GetPostDetailResponse> {
        const prisma = new PrismaClient()
        const qs = new PostDetailQS(prisma)
        const usecase = new GetPostDetailUseCase(qs)
        try {
            const result = await usecase.do({
                token: token,
                postId: param.postId,
                userId: param.userId
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
            const response = new GetPostDetailResponse({ PostDetails: result })
            return response
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }


    @Post('/userId/:userId')
    async postUser(
        @Param() userId: string,
        @Body() postUserDto: PostPutUserRequest,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new PostPostUseCase(postRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                imageUrl: postUserDto.imageUrl,
                title: postUserDto.title,
                text: postUserDto.text,
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }

    @Put('/userId/:userId/postId/:postId')
    async putUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Body() putUserDto: PostPutUserRequest,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new PutPostUseCase(postRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
                imageUrl: putUserDto.imageUrl,
                title: putUserDto.title,
                text: putUserDto.text,
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }


    @Delete('/userId/:userId/postId/:postId')
    async deletePost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const postRepo = new PostRepository(prisma)
        const usecase = new DeletePostUseCase(postRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId
            })
            if (result === 'tokenError') {
                throw new UnauthorizedException();
            }
        } catch (e) {
            if (e.name === 'UnauthorizedException') {
                throw new UnauthorizedException();
            }
            throw new InternalServerErrorException();
        }
    }
}
