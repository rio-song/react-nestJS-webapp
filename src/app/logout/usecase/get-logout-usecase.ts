import { ILogoutRepository } from "src/domain/repository-interface/logout-repository";

export class GetLogoutUseCase {
    private readonly loginRepo: ILogoutRepository

    public constructor(loginRepo: ILogoutRepository) {
        this.loginRepo = loginRepo
    }
    public async do(token: string) {
        try {
            await this.loginRepo.logout(token);
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
