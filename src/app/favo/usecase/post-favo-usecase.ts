import { favoVO } from 'src/domain/entity/favoVO'
import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'

export class PostFavoUseCase {
    private readonly favoRepo: IFavoRepository

    public constructor(favoRepo: IFavoRepository) {
        this.favoRepo = favoRepo
    }

    public async do(params: { userId: string, postId: string, }) {
        const {
            userId,
            postId,
        } = params

        const favoEntity = new favoVO({
            userId,
            postId,
        })
        await this.favoRepo.save(favoEntity);
    }
}
