import { ILogoutQS } from '../logout-qs-if'


export class GetLogoutUseCase {
    private readonly logoutQS: ILogoutQS
    public constructor(logoutQS: ILogoutQS) {
        this.logoutQS = logoutQS
    }
    public async do(token: string) {
        try {
            await this.logoutQS.logout(token);
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
