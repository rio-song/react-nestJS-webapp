import { IPostQS } from '../post-qs-if'

export class GetPostsUserAllUseCase {
    private readonly postQS: IPostQS
    public constructor(postQS: IPostQS) {
        this.postQS = postQS
    }
    public async do(params: { _token: string, userId: string, count: number, lastPostId: string | null }) {
        let {
            userId,
            count,
            lastPostId,
            _token,
        } = params
        if (_token == null || _token == undefined || _token == ""
            || userId == null || userId == undefined || userId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        try {
            return await this.postQS.getPostsUserAll(_token, userId, count, lastPostId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
