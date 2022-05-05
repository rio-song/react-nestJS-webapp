import { PrismaClient } from '@prisma/client'
import {
    PostDetailDTO,
    IPostDetailQS,
    CommentDTO
} from 'src/app/post/post-detail-qs-if'

export class PostDetailQS implements IPostDetailQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getPostDetail(postId: string): Promise<PostDetailDTO> {

        const allPostDetail = await this.prismaClient.post.findUnique({
            where: {
                id: postId
            },
            include: {
                comments: true,
                _count: true,
                favos: true,
            }
        })
        return new PostDetailDTO({
            id: allPostDetail.id,
            imageUrl: allPostDetail.image_url,
            title: allPostDetail.title,
            text: allPostDetail.text,
            postedAt: allPostDetail.posted_at,
            favosCount: allPostDetail._count.favos,
            commentsCount: allPostDetail._count.comments,
            comments: allPostDetail.comments.map((c) => new CommentDTO({
                id: c.id,
                comment: c.comment,
                commentedUserId: c.user_id,
                commentededAt: c.commented_at,
            }))
        })

    }
}