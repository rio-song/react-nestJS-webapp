import { Controller, Headers, Post } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLogoutUseCase } from 'src/app/logout/usecase/get-logout-usecase'
import { LogoutRepository } from 'src/infra/logout/logout-repository'
import { ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('ログアウト')
@Controller({
    path: 'api/logout',
})
export class LogoutController {

    @Post()
    @ApiResponse({ status: 201, description: 'Success' })
    @ApiResponse({ status: 500, description: '予期せぬエラーが発生しました。(InternalServerError)' })

    async getLogout(
        @Headers('token') token: string
    ): Promise<void> {
        const prisma = new PrismaClient()
        const logoutRepo = new LogoutRepository(prisma)
        const usecase = new GetLogoutUseCase(logoutRepo)
        await usecase.do(token)
    }
}
