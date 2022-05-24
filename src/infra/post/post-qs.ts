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
    public async getPostsAllwithFavoStatus(userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]> {
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
                    },
                    favos: {
                        where: {
                            user_id: userId
                        }
                    },
                    posted_user: {
                        include: {
                            user: {}
                        }
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
                        favoStatus: postDM.favos.length,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
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
                    },
                    favos: {
                        where: {
                            user_id: userId
                        }
                    },
                    posted_user: {
                        include: {
                            user: {}
                        }
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
                        favoStatus: postDM.favos.length,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
                    }),
            )
        }
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
                    },
                    posted_user: {
                        include: {
                            user: {}
                        }
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
                        favoStatus: null,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
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
                    },
                    posted_user: {
                        include: {
                            user: {}
                        }
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
                        favoStatus: null,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
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
                    }, favos: {
                        where: {
                            user_id: userId
                        }
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
                        favoStatus: postDM.favos.length,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
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
                    }, favos: {
                        where: {
                            user_id: userId
                        }
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
                        favoStatus: postDM.favos.length,
                        commentsCount: postDM._count.comments,
                        lastPostId: allPosts.slice(-1)[0].id,
                        nickName: postDM.posted_user.slice[0].nickName,
                        userId: postDM.posted_user.slice[0].user_id
                    }),
            )
        }
    }
}