import { IPostQS } from '../post-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetPostsUserAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { token: string, userId: string, count: number, lastPostId: string | null }) {
        let {
            token,
            userId,
            count,
            lastPostId,
        } = params

        try {
            await new DomainService().tokenCheck(token);
            if ('tokenError') {
                return 'tokenError'
            }
            return await this.postQS.getPostsUserAll(userId, count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
