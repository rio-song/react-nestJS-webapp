import { Controller, Get, Headers, } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLogoutUseCase } from 'src/app/logout/usecase/get-logout-usecase'
import { LogoutQS } from 'src/infra/logout/logout-qs'

@Controller({
    path: 'api/logout',
})
export class LogoutController {

    @Get()
    async getLogout(
        @Headers('token') token: string
    ): Promise<void> {
        const prisma = new PrismaClient()
        const qs = new LogoutQS(prisma)
        const usecase = new GetLogoutUseCase(qs)
        await usecase.do(token)
    }
}
