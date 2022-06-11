import { Body, Controller, Post, } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { GetLoginUseCase } from 'src/app/login/usecase/get-login-usecase'
import { GetLoginRequest } from './request/get-login-request'
import { GetLoginResponse } from './response/get-login-response'
import { LoginRepository } from 'src/infra/login/login-repository'
import { UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException } from '../../util/error'

@Controller({
    path: 'api/login',
})
export class LoginController {

    @Post()
    async getLogin(
        @Body() getLoginDto: GetLoginRequest,
    ): Promise<GetLoginResponse> {
        const prisma = new PrismaClient()
        const loginRepo = new LoginRepository(prisma)
        const usecase = new GetLoginUseCase(loginRepo)
        try {
            const result = await usecase.do({
                email: getLoginDto.email,
                password: getLoginDto.password,
            })
            const response = new GetLoginResponse(result)
            return response
        } catch (e) {
            if (e === 'notFoundAccount') {
                throw new NotFoundException();
            } else if (e === 'badrequest') {
                throw new BadRequestException();
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}