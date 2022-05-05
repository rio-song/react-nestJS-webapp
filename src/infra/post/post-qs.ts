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

    public async getPostsAll(count: number, lastPostId: string | null): Promise<PostDTO[]> {
        if (lastPostId != null) {
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
        } else {
            const allPosts = await this.prismaClient.post.findMany({
                take: count,
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
    }

    public async getPostsUserAll(userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]> {
        if (lastPostId != null) {
            const allPosts = await this.prismaClient.post.findMany({
                take: Number(count),
                skip: 1,
                cursor: {
                    id: lastPostId
                },
                orderBy: {
                    posted_at: 'desc',
                },
                include: {
                    posted_user: {
                        where: {
                            user_id: userId
                        }
                    },
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
        } else {
            const allPosts = await this.prismaClient.post.findMany({
                take: Number(count),
                orderBy: {
                    posted_at: 'desc',
                },
                include: {
                    posted_user: {
                        where: {
                            user_id: userId
                        }
                    },
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
    }
}