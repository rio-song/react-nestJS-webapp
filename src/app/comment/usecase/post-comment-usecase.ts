import { createRandomIdString } from 'src/util/random'
import { Comment } from "src/domain/entity/comment"
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"
import { DomainService } from 'src/domain/domain-service/domain-service'

export class PostCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }

    public async do(params: { token: string, userId: string, postId: string, comment: string, }) {
        const {
            token,
            userId,
            postId,
            comment,
        } = params

        await new DomainService().tokenCheck(token);
        if ('tokenError') {
            return 'tokenError'
        }

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
