import { Post } from 'src/domain/entity/post'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'

export class DeletePostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { userId: string, postId: string }) {
        const {
            userId,
            postId,
        } = params

        await this.postRepo.delete(postId, userId);

    }
}
