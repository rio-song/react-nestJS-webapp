import { PrismaClient } from '@prisma/client'
import { favoVO } from 'src/domain/entity/favoVO'
import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'
import { createRandomIdString } from 'src/util/random'

export class FavoRepository implements IFavoRepository {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async save(favoEntity: favoVO): Promise<favoVO> {
        const { userId, postId } = favoEntity.getAllProperties()

        await this.prismaClient.favos.create({
            data: {
                id: createRandomIdString(),
                user_id: userId,
                post_id: postId,
                updated_at: new Date(),
                created_at: new Date(),
            }
        })
        return favoEntity;
    }

    public async delete(postId: string, userId: string): Promise<boolean> {

        await this.prismaClient.favos.deleteMany({
            where: {
                user_id: userId,
                post_id: postId
            },
        })

        return true;
    }
}
