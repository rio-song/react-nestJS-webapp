import { PrismaClient } from '@prisma/client'
import {
    UserDTO,
    IUserQS,
} from 'src/app/user/user-qs-if'

export class UserQS implements IUserQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getUser(userId): Promise<UserDTO> {
        const user = await this.prismaClient.user.findUnique({
            where: userId
        })
        return new UserDTO({
            id: user.id,
            firstName: user.first_name,
            familyName: user.family_name,
            nickName: user.nick_name,
            imageUrl: user.user_img_url,
            email: user.email,
            password: user.password,
            registeredAt: user.registered_at,
            createdAt: user.created_at,
            updatedAt: user.updated_at
        })
    }

}