import { DomainService } from 'src/domain/domain-service/domain-service'
import { favoVO } from 'src/domain/entity/favoVO'
import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'

export class PostFavoUseCase {
    private readonly favoRepo: IFavoRepository

    public constructor(favoRepo: IFavoRepository) {
        this.favoRepo = favoRepo
    }

    public async do(params: { token: string, userId: string, postId: string, }) {
        const {
            token,
            userId,
            postId,
        } = params
        await new DomainService().tokenCheck(token);
        const favoEntity = new favoVO({
            userId,
            postId,
        })
        await this.favoRepo.save(favoEntity);
    }
}
