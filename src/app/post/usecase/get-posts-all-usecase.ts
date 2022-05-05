import { IPostQS } from '../post-qs-if'

export class GetPostsAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { count: number, lastPostId: string | null }) {
        let {
            count,
            lastPostId,
        } = params
        try {
            return await this.postQS.getPostsAll(count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
