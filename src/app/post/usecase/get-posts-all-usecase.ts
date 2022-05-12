import { DomainService } from 'src/domain/domain-service/domain-service'
import { IPostQS } from '../post-qs-if'

export class GetPostsAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { token: string | null, count: number, lastPostId: string | null }) {
        let {
            token,
            count,
            lastPostId,
        } = params
        try {
            if (token != null) {
                await new DomainService().tokenCheck(token);
            }
            return await this.postQS.getPostsAll(count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
