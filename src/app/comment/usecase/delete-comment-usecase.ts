import { DomainService } from 'src/domain/domain-service/domain-service'
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"

export class DeletCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }

    public async do(params: { token: string, commentId: string }) {
        if (params.token == null || params.token == undefined || params.token == ""
            || params.commentId == null || params.commentId == undefined || params.commentId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
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
