import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class DeleteFavoUseCase {
    private readonly favoRepo: IFavoRepository

    public constructor(favoRepo: IFavoRepository) {
        this.favoRepo = favoRepo
    }

    public async do(params: { token: string, userId: string, postId: string }) {
        const {
            token,
            userId,
            postId,
        } = params
        await new DomainService().tokenCheck(token);
        await this.favoRepo.delete(postId, userId);

    }
}
