import { PrismaClient } from '@prisma/client'
import { ILogoutRepository } from 'src/domain/repository-interface/logout-repository'

export class LogoutRepository implements ILogoutRepository {
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
