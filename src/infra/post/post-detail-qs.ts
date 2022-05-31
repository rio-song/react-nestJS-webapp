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

    public async getPostDetail(postId: string, userId: string): Promise<PostDetailDTO> {
        const allPostDetail = await this.prismaClient.post.findUnique({
            where: {
                id: postId
            },
            include: {
                _count: true,
                favos: {
                    where: { user_id: userId }
                },
                posted_user: {
                    include: {
                        user: true
                    }
                },
                comments: {
                    include: {
                        user: true
                    }
                },
            }
        })

        let favoStatus = false;
        if (allPostDetail.favos.length > 1) {
            favoStatus = true
        }

        return new PostDetailDTO({
            id: allPostDetail.id,
            imageUrl: allPostDetail.image_url,
            title: allPostDetail.title,
            text: allPostDetail.text,
            postedAt: allPostDetail.posted_at,
            favosCount: allPostDetail._count.favos,
            favo: favoStatus,
            nickName: allPostDetail.posted_user[0].user.nick_name,
            userId: allPostDetail.posted_user[0].user_id,
            userImageUrl: allPostDetail.posted_user[0].user.user_img_url,
            commentsCount: allPostDetail._count.comments,
            comments: allPostDetail.comments.map((c) => new CommentDTO({
                id: c.id,
                comment: c.comment,
                commentedUserId: c.user_id,
                commentededAt: c.commented_at,
                commentedUserImageUrl: c.user.user_img_url,
                commentedUserNickName: c.user.nick_name
            }))
        })

    }
}