import { IUserQS } from '../user-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetUserUseCase {
    private readonly userQS: IUserQS
    public constructor(userQS: IUserQS) {
        this.userQS = userQS
    }
    public async do(params: { token: string, userId: string }) {
        let {
            token,
            userId,
        } = params
        if (params.token == null || params.token == undefined || params.token == ""
            || params.userId == null || params.userId == undefined || params.userId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        try {
            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
                return 'tokenError'
            }
            return await this.userQS.getUser(userId)
        } catch (error) {
            return error;
        }
    }
}
