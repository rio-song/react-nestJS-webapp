import { Comment } from "src/domain/entity/comment"
import { ICommentRepository } from "src/domain/repository-interface/comment-repository"
import { DomainService } from 'src/domain/domain-service/domain-service'

export class PutCommentUseCase {
    private readonly commentRepo: ICommentRepository

    public constructor(commentRepo: ICommentRepository) {
        this.commentRepo = commentRepo
    }
    public async do(params: { token: string, userId: string, postId: string, commentId: string; comment: string, }) {
        try {
            if (params.token == null || params.token == undefined || params.token == ""
                || params.userId == null || params.userId == undefined || params.userId == ""
                || params.postId == null || params.postId == undefined || params.postId == ""
                || params.commentId == null || params.commentId == undefined || params.commentId == ""
                || params.comment == null || params.comment == undefined || params.comment == "") {
                const e = new Error('notFoundAccount')
                return Promise.reject(e.message);
            }
            const {
                token,
                userId,
                postId,
                commentId,
                comment,
            } = params
            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
                return 'tokenError'
            }

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
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}

