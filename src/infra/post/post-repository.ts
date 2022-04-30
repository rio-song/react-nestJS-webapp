import { PrismaClient } from '@prisma/client'
import { Post } from 'src/domain/entity/post'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { createRandomIdString } from 'src/util/random'

export class PostRepository implements IPostRepository {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async save(postEntity: Post): Promise<Post> {
        const { id, imageUrl, title, text, postedAt, postedUser } = postEntity.getAllProperties()

        await this.prismaClient.post.create({
            data: {
                id: id,
                image_url: imageUrl,
                title: title,
                text: text,
                posted_at: postedAt,
                updated_at: new Date(),
                created_at: new Date(),
                posted_user: {
                    create: {
                        id: createRandomIdString(),
                        user_id: postedUser,
                        updated_at: new Date(),
                        created_at: new Date()
                    }
                }
            }
        })
        return postEntity;
    }

    public async getPost(postId: string): Promise<Post> {

        const post = await this.prismaClient.post.findUnique({
            where: {
                id: postId
            },
            include: {
                posted_user: true
            }
        })
        const postEntity = new Post({
            id: post.id,
            imageUrl: post.image_url,
            title: post.title,
            text: post.text,
            postedAt: post.posted_at,
            postedUser: post.posted_user.slice()[0].id,
            createAt: post.created_at,
        })

        return postEntity;
    }

    public async update(postEntity: Post): Promise<Post> {

        const { id, imageUrl, title, text, postedAt, postedUser, createAt } = postEntity.getAllProperties()

        await this.prismaClient.$transaction(async (prismaClient) => {

            await this.prismaClient.post.delete({
                where: {
                    id: id
                },
            })
            await this.prismaClient.postedUser.deleteMany({
                where: {
                    post_id: id,
                    user_id: postedUser
                },
            })
            await this.prismaClient.post.create({
                data: {
                    id: id,
                    image_url: imageUrl,
                    title: title,
                    text: text,
                    posted_at: postedAt,
                    updated_at: new Date(),
                    created_at: createAt,
                    posted_user: {
                        create: {
                            id: createRandomIdString(),
                            user_id: postedUser,
                            updated_at: new Date(),
                            created_at: new Date()
                        }
                    }
                }
            })
        })
        return postEntity;
    }

    public async delete(postId: string, userId: string): Promise<boolean> {

        await this.prismaClient.$transaction(async (prismaClient) => {

            await this.prismaClient.post.delete({
                where: {
                    id: postId
                },
            })
            await this.prismaClient.postedUser.deleteMany({
                where: {
                    post_id: postId,
                    user_id: userId
                },
            })
        })
        return true;
    }
}
