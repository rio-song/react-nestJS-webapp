import { Comment } from "src/domain/entity/comment"
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"

export class DeletCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }

    public async do(params: { userId: string, postId: string, commentId: string }) {
        const {
            userId,
            postId,
            commentId
        } = params

        await this.commentRepo.delete(postId, userId, commentId);

    }
}
