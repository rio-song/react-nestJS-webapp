import { IUserQS } from '../user-qs-if'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class GetUserUseCase {
    private readonly userQS: IUserQS
    public constructor(userQS: IUserQS) {
        this.userQS = userQS
    }
    public async do(token: string, userId: string) {
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
