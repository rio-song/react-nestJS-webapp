import { Controller, Headers, Post } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLogoutUseCase } from 'src/app/logout/usecase/get-logout-usecase'
import { LogoutRepository } from 'src/infra/logout/logout-repository'

@Controller({
    path: 'api/logout',
})
export class LogoutController {

    @Post()
    async getLogout(
        @Headers('token') token: string
    ): Promise<void> {
        const prisma = new PrismaClient()
        const logoutRepo = new LogoutRepository(prisma)
        const usecase = new GetLogoutUseCase(logoutRepo)
        await usecase.do(token)
    }
}
