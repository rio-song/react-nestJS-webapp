import { Body, Controller, Get, } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLoginUseCase } from 'src/app/login/usecase/get-login-usecase'
import { GetLoginRequest } from './request/get-login-request'
import { GetLoginResponse } from './response/get-login-response'
import { LoginQS } from 'src/infra/login/login-qs'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'

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
        try {
            const result = await usecase.do({
                email: getLoginDto.email,
                password: getLoginDto.password,
            })
            const response = new GetLoginResponse(result)
            return response
        } catch (e) {
            if (e.name === 'BadRequestException') {
                throw new BadRequestException();
            }
            throw new InternalServerErrorException();
        }
    }

}
