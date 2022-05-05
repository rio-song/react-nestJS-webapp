import { IPostDetailQS } from '../post-detail-qs-if'

export class GetPostDetailUseCase {
    private readonly postQS: IPostDetailQS
    public constructor(postQS: IPostDetailQS) {
        this.postQS = postQS
    }
    public async do(params: { postId: string }) {
        let { postId } = params

        try {
            return await this.postQS.getPostDetail(postId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
