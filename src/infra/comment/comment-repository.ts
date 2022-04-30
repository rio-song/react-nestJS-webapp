import { PrismaClient } from '@prisma/client'
import { Comment } from 'src/domain/entity/comment'
import { ICommentRepository } from 'src/domain/repository-interface/comment-repository'

export class CommentRepository implements ICommentRepository {
    private prismaClient: PrismaClient
    public constructor(prismaClient: PrismaClient) {
        this.prismaClient = prismaClient
    }

    public async save(commentEntity: Comment): Promise<Comment> {
        const { id, commentedUserId, postId, comment, commentedAt } = commentEntity.getAllProperties()

        await this.prismaClient.comments.create({
            data: {
                id: id,
                user_id: commentedUserId,
                post_id: postId,
                comment: comment,
                commented_at: commentedAt,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })
        return commentEntity;
    }

    public async getComment(commentId: string): Promise<Comment> {
        const comment = await this.prismaClient.comments.findUnique({
            where: {
                id: commentId
            }
        })
        const postEntity = new Comment({
            id: comment.id,
            commentedUserId: comment.user_id,
            postId: comment.post_id,
            comment: comment.comment,
            commentedAt: comment.commented_at,
            createAt: comment.created_at,
        })

        return postEntity;
    }

    public async update(commentEntity: Comment): Promise<Comment> {
        const { id, commentedUserId, postId, comment, commentedAt, createAt } = commentEntity.getAllProperties()

        await this.prismaClient.$transaction(async (prismaClient) => {

            await this.prismaClient.comments.delete({
                where: {
                    id: id
                },
            })
            await this.prismaClient.comments.create({
                data: {
                    id: id,
                    user_id: commentedUserId,
                    post_id: postId,
                    comment: comment,
                    commented_at: commentedAt,
                    created_at: createAt,
                    updated_at: new Date(),
                }
            })
        })
        return commentEntity;

    }

    public async delete(postId: string, userId: string, commentId: string): Promise<boolean> {

        await this.prismaClient.comments.delete({
            where: {
                id: commentId
            },
        })
        return true;
    }
}
