import { IPostQS } from '../post-qs-if'

export class GetPostsUserAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { userId: string, count: number, lastPostId: string | null }) {
        let {
            userId,
            count,
            lastPostId,
        } = params
        if (userId == null || userId == undefined || userId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        try {
            return await this.postQS.getPostsUserAll(userId, count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
