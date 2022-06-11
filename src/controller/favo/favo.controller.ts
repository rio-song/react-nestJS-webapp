import { Controller, Post, Param, Delete, Headers } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostFavoUseCase } from 'src/app/favo/usecase/post-favo-usecase'
import { DeleteFavoUseCase } from 'src/app/favo/usecase/delete-favo-usecase'
import { FavoRepository } from 'src/infra/favo/post-repository'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'


@Controller({
    path: 'api/favo',
})
export class FavoController {
    @Post('/postId/:postId/userId/:userId')
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
