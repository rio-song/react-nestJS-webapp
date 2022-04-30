import { IFavoRepository } from 'src/domain/repository-interface/favo-repository'

export class DeleteFavoUseCase {
    private readonly favoRepo: IFavoRepository

    public constructor(favoRepo: IFavoRepository) {
        this.favoRepo = favoRepo
    }

    public async do(params: { userId: string, postId: string }) {
        const {
            userId,
            postId,
        } = params

        await this.favoRepo.delete(postId, userId);

    }
}
