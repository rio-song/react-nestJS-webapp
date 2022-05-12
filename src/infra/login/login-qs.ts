import { PrismaClient } from '@prisma/client'
import {
    LoginDTO,
    ILoginQS,
} from 'src/app/login/login-qs-if'
import { createRandomIdString } from 'src/util/random'


export class LoginQS implements ILoginQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getLogin(email, password): Promise<LoginDTO> {
        const login = await this.prismaClient.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        return new LoginDTO({
            userId: login.id
        })
    }
    public async setToken(userId: string, token: string): Promise<boolean> {
        const login = await this.prismaClient.login.create({
            data: {
                id: createRandomIdString(),
                user_id: userId,
                token: token
            }
        })
        if (login) {
            return true
        } else {
            throw new Error("トークンの登録失敗")
        }
    }
    public async checkLogin(userId: string): Promise<boolean> {
        const setToken = await this.prismaClient.login.findFirst({
            where: {
                user_id: userId
            }
        })
        if (setToken == null) {
            return true
        } else {
            throw new Error("既にトークンを登録済みです")
        }
    }
}
