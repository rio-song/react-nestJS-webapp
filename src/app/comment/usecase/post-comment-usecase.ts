import { createRandomIdString } from 'src/util/random'
import { Comment } from "src/domain/entity/comment"
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"

export class PostCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }

    public async do(params: { userId: string, postId: string, comment: string, }) {
        const {
            userId,
            postId,
            comment,
        } = params

        const commentEntity = new Comment({
            id: createRandomIdString(),
            commentedUserId: userId,
            postId,
            comment,
            commentedAt: new Date(),
            createAt: null
        })
        await this.commentRepo.save(commentEntity);
    }
}
