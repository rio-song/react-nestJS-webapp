import { Body, Controller, Post, Put, Param, Delete, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostPutCommentRequest } from './request/post-put-comment-request'
import { PostCommentUseCase } from 'src/app/comment/usecase/post-comment-usecase'
import { PutCommentUseCase } from 'src/app/comment/usecase/put-comment-usecase'
import { DeletCommentUseCase } from 'src/app/comment/usecase/delete-comment-usecase'
import { CommentRepository } from 'src/infra/comment/comment-repository'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'


@Controller({
    path: 'api/comment',
})
export class CommentController {
    @Post('/postId/:postId/userId/:userId')
    async postUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Headers('token') token: string,
        @Body() postCommentDto: PostPutCommentRequest,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const commentRepo = new CommentRepository(prisma)
        const usecase = new PostCommentUseCase(commentRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
                comment: postCommentDto.comment
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

    @Put('/postId/:postId/userId/:userId/commentId/:commentId')
    async putUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Headers('token') token: string,
        @Body() postCommentDto: PostPutCommentRequest,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const commentRepo = new CommentRepository(prisma)
        const usecase = new PutCommentUseCase(commentRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
                commentId: commentId,
                comment: postCommentDto.comment
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

    @Delete('/postId/:postId/userId/:userId/commentId/:commentId')
    async deletePost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Param('commentId') commentId: string,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const commentRepo = new CommentRepository(prisma)
        const usecase = new DeletCommentUseCase(commentRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
                commentId: commentId
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
