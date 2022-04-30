import { Comment } from "src/domain/entity/comment"
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"

export class PutCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }
    public async do(params: { userId: string, postId: string, commentId: string; comment: string, }) {
        const {
            userId,
            postId,
            commentId,
            comment,
        } = params

        const savedcomment = await this.commentRepo.getComment(commentId);

        const commentEntity = new Comment({
            id: commentId,
            commentedUserId: userId,
            postId,
            comment,
            commentedAt: new Date(),
            createAt: savedcomment.getCreateAt()
        })

        await this.commentRepo.update(commentEntity);

    }
}

