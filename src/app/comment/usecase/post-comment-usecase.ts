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
        try {
            if (params.token == null || params.token == undefined || params.token == ""
                || params.userId == null || params.userId == undefined || params.userId == ""
                || params.postId == null || params.postId == undefined || params.postId == ""
                || params.comment == null || params.comment == undefined || params.comment == "") {
                const e = new Error('badrequest')
                return Promise.reject(e.message);
            }

            const {
                token,
                userId,
                postId,
                comment,
            } = params

            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
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
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}