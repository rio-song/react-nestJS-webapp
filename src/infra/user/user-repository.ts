import { PrismaClient } from '@prisma/client'
import { User } from 'src/domain/entity/user'
import { IUserRepository } from 'src/domain/repository-interface/user-repository'

export class UserRepository implements IUserRepository {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async save(userEntity: User): Promise<User> {
        const { id, firstName, familyName, nickName, imageUrl, email, password,
            registeredAt } = userEntity.getAllProperties()
        await this.prismaClient.user.create({
            data: {
                id: id,
                first_name: firstName,
                family_name: familyName,
                nick_name: nickName,
                user_img_url: imageUrl != null ? imageUrl : undefined,
                email: email,
                password: password,
                registered_at: registeredAt,
                updated_at: new Date(),
                created_at: new Date(),
            }
        })
        return userEntity;
    }

    public async getUser(userId: string): Promise<User> {

        const user = await this.prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const userEntity = new User({
            id: user.id,
            firstName: user.first_name,
            familyName: user.family_name,
            nickName: user.nick_name,
            imageUrl: user.user_img_url,
            email: user.email,
            password: user.password,
            registeredAt: user.registered_at,
            createdAt: user.created_at,
        })

        return userEntity;
    }

    public async update(userEntity: User): Promise<User> {
        const { id, firstName, familyName, nickName, imageUrl, email, password,
            registeredAt, createdAt } = userEntity.getAllProperties()

        await this.prismaClient.$transaction(async (prismaClient) => {

            await this.prismaClient.user.delete({
                where: {
                    id: id
                },
            })

            await this.prismaClient.user.create({
                data: {
                    id: id,
                    first_name: firstName,
                    family_name: familyName,
                    nick_name: nickName,
                    user_img_url: imageUrl,
                    email: email,
                    password: password,
                    registered_at: registeredAt,
                    updated_at: new Date(),
                    created_at: createdAt,
                }
            })
        })
        return userEntity;
    }


}
