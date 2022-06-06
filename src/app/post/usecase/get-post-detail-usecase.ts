import { IPostDetailQS } from '../post-detail-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetPostDetailUseCase {
    private readonly postQS: IPostDetailQS
    public constructor(postQS: IPostDetailQS) {
        this.postQS = postQS
    }
    public async do(params: { token: string, postId: string; userId: string }) {
        if (params.token == null || params.token == undefined || params.token == ""
            || params.postId == null || params.postId == undefined || params.postId == ""
            || params.userId == null || params.userId == undefined || params.userId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        let { token, postId, userId } = params
        const tokenError = await new DomainService().tokenCheck(token);
        if (tokenError === 'tokenError') {
            return 'tokenError'
        }
        try {
            return await this.postQS.getPostDetail(postId, userId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
