import { PostQS } from "src/infra/post/post-qs"

export class GetPostsAllUseCase {
    private readonly postQS: PostQS
    public constructor(postQS: PostQS) {
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
