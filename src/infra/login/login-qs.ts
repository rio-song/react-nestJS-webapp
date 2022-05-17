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
        console.log("email" + email)
        console.log("password" + password)
        const login = await this.prismaClient.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        console.log("login" + login)
        if (login == null) {
            const e = new Error('notFoundAccount')
            return Promise.reject(e.message);
        }
        return new LoginDTO({
            userId: login.id
        })
    }
    public async setToken(userId: string, token: string): Promise<boolean> {
        await this.prismaClient.$transaction(async (prismaClient) => {

            await this.prismaClient.login.deleteMany({
                where: {
                    user_id: userId,
                }
            })

            await this.prismaClient.login.create({
                data: {
                    id: createRandomIdString(),
                    user_id: userId,
                    token: token
                }
            })
        })
        return true
    }
}
