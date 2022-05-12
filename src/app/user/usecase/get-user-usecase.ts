import { IUserQS } from '../user-qs-if'

export class GetUserUseCase {
    private readonly userQS: IUserQS
    public constructor(userQS: IUserQS) {
        this.userQS = userQS
    }
    public async do(userId: string) {
        try {
            return await this.userQS.getUser(userId)
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
