import { PrismaClient } from '@prisma/client'
import { CommentDTO } from 'src/app/comment/comment-qs-if'
import { ICommentQS } from 'src/app/comment/comment-qs-if'

export class CommentQS implements ICommentQS {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async getComment(postId: string): Promise<CommentDTO[]> {
        const allComment = await this.prismaClient.comments.findMany({
            where: {
                post_id: postId,
            }, include: {
                user: true
            }
        })

        return allComment.map(
            (c) => new CommentDTO({
                id: c.id,
                comment: c.comment,
                commentedUserId: c.user_id,
                commentededAt: c.commented_at,
                commentedUserImageUrl: c.user.user_img_url,
                commentedUserNickName: c.user.nick_name
            }))
    }
}