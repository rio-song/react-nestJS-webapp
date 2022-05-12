import { IPostDetailQS } from '../post-detail-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetPostDetailUseCase {
    private readonly postQS: IPostDetailQS
    public constructor(postQS: IPostDetailQS) {
        this.postQS = postQS
    }
    public async do(params: { token: string, postId: string }) {
        let { token, postId } = params
        await new DomainService().tokenCheck(token);
        try {
            return await this.postQS.getPostDetail(postId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
