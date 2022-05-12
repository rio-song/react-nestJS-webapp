import { Body, Controller, Get, } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLoginUseCase } from 'src/app/login/usecase/get-login-usecase'
import { GetLoginRequest } from './request/get-login-request'
import { GetLoginResponse } from './response/get-login-response'
import { LoginQS } from 'src/infra/login/login-qs'

@Controller({
    path: 'api/login',
})
export class LoginController {

    @Get()
    async getLogin(
        @Body() getLoginDto: GetLoginRequest,
    ): Promise<GetLoginResponse> {
        const prisma = new PrismaClient()
        const qs = new LoginQS(prisma)
        const usecase = new GetLoginUseCase(qs)
        const result = await usecase.do({
            email: getLoginDto.email,
            password: getLoginDto.password,
        })
        const response = new GetLoginResponse(result)
        return response
    }

}
