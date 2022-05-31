import { DomainService } from 'src/domain/domain-service/domain-service'
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"

export class DeletCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }

    public async do(params: { token: string, commentId: string }) {

        const {
            token,
            commentId
        } = params
        const tokenError = await new DomainService().tokenCheck(token);
        if (tokenError === 'tokenError') {
            return 'tokenError'
        }

        await this.commentRepo.delete(commentId);

    }
}
