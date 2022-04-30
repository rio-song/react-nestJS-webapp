import { PrismaClient } from '@prisma/client'
import {
    PostDTO,
    IPostQS,
} from 'src/app/post/post-qs-if'

export class PostQS implements IPostQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getAllPosts(count: number, lastPostId: string): Promise<PostDTO[]> {
        const allPosts = await this.prismaClient.post.findMany({
            take: count,
            skip: 1,
            cursor: {
                id: lastPostId
            },
            orderBy: {
                posted_at: 'desc',
            },
            include: {
                _count: {
                    select: { favos: true, comments: true },
                }

            }
        })
        return allPosts.map(
            (postDM) =>
                new PostDTO({
                    id: postDM.id,
                    imageUrl: postDM.image_url,
                    title: postDM.title,
                    text: postDM.text,
                    postedAt: postDM.posted_at,
                    favosCount: postDM._count.favos,
                    commentsCount: postDM._count.comments,
                    lastPostId: allPosts.slice(-1)[0].id
                }),
        )
    }

    // public async getUser(email: string): Promise<UserDTO> {
    //     const user = await this.prismaClient.user.findFirst({
    //         where: {
    //             email: email
    //         },
    //     })

    //     if (user === null) {
    //         throw new Error("存在しないユーザーです")
    //     }
    //     return new UserDTO(user)
    // }
}