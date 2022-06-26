import { Controller, Post, Param, Delete, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostFavoUseCase } from 'src/app/favo/usecase/post-favo-usecase'
import { DeleteFavoUseCase } from 'src/app/favo/usecase/delete-favo-usecase'
import { FavoRepository } from 'src/infra/favo/post-repository'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('お気に入り機能')
@Controller({
    path: 'api/favo',
})
export class FavoController {
    @Post('/postId/:postId/userId/:userId')
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 401, description: '認証エラーが発生しました(tokenError)' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })

    async postUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const favoRepo = new FavoRepository(prisma)
        const usecase = new PostFavoUseCase(favoRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
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

    @Delete('/postId/:postId/userId/:userId')
    @ApiResponse({ status: 200, description: 'Success' })
    @ApiResponse({ status: 401, description: '認証エラーが発生しました(tokenError)' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })
    async deletePost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
        @Headers('token') token: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const favoRepo = new FavoRepository(prisma)
        const usecase = new DeleteFavoUseCase(favoRepo)
        try {
            const result = await usecase.do({
                token: token,
                userId: userId,
                postId: postId,
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
