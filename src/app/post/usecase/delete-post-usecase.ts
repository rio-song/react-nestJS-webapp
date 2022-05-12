import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class DeletePostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { token: string, userId: string, postId: string }) {
        const {
            token,
            userId,
            postId,
        } = params
        await new DomainService().tokenCheck(token);
        await this.postRepo.delete(postId, userId);

    }
}
