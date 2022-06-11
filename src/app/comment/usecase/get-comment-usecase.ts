import { ICommentQS } from '../comment-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetCommentUseCase {
    private readonly commentQS: ICommentQS
    public constructor(commentQS: ICommentQS) {
        this.commentQS = commentQS
    }
    public async do(params: { token: string, postId: string; }) {
        if (params.token == null || params.token == undefined || params.token == ""
            || params.postId == null || params.postId == undefined || params.postId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        let { token, postId } = params
        const tokenError = await new DomainService().tokenCheck(token);
        if (tokenError === 'tokenError') {
            return 'tokenError'
        }
        try {
            return await this.commentQS.getComment(postId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
