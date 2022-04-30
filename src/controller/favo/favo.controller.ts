import { Controller, Post, Param, Delete } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PostFavoUseCase } from 'src/app/favo/usecase/post-favo-usecase'
import { DeleteFavoUseCase } from 'src/app/favo/usecase/delete-favo-usecase'
import { FavoRepository } from 'src/infra/favo/post-repository'


@Controller({
    path: 'api/favo',
})
export class FavoController {
    @Post(':postId/:userId')
    async postUser(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const favoRepo = new FavoRepository(prisma)
        const usecase = new PostFavoUseCase(favoRepo)
        await usecase.do({
            userId: userId,
            postId: postId,
        })
    }

    @Delete(':userId/:postId/')
    async deletePost(
        @Param('userId') userId: string,
        @Param('postId') postId: string,
    ): Promise<void> {
        const prisma = new PrismaClient()
        const favoRepo = new FavoRepository(prisma)
        const usecase = new DeleteFavoUseCase(favoRepo)
        await usecase.do({
            userId: userId,
            postId: postId,
        })
    }
}
