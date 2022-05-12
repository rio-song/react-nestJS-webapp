import { PrismaClient } from '@prisma/client'
import {
    ILogoutQS,
} from 'src/app/logout/logout-qs-if'

export class LogoutQS implements ILogoutQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async logout(token: string): Promise<boolean> {
        const setToken = await this.prismaClient.login.deleteMany({
            where: {
                token: token
            }
        })
        return true
    }
}
