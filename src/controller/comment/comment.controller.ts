import { Body, Controller, Post, Put, Param, Delete, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostPutCommentRequest } from './request/post-put-comment-request'
import { PostCommentUseCase } from 'src/app/comment/usecase/post-comment-usecase'
import { PutCommentUseCase } from 'src/app/comment/usecase/put-comment-usecase'
import { DeletCommentUseCase } from 'src/app/comment/usecase/delete-comment-usecase'
import { CommentRepository } from 'src/infra/comment/comment-repository'


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
        await usecase.do({
            token: token,
            userId: userId,
            postId: postId,
            comment: postCommentDto.comment
        })
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
        await usecase.do({
            token: token,
            userId: userId,
            postId: postId,
            commentId: commentId,
            comment: postCommentDto.comment
        })
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
        await usecase.do({
            token: token,
            userId: userId,
            postId: postId,
            commentId: commentId
        })
    }
}
