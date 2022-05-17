import { Post } from 'src/domain/entity/post'
import { createRandomIdString } from 'src/util/random'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class PostPostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { token: string, userId: string, imageUrl: string, title: string, text: string, }) {
        const {
            token,
            userId,
            imageUrl,
            title,
            text,
        } = params
        await new DomainService().tokenCheck(token);
        if ('tokenError') {
            return 'tokenError'
        }
        const postEntity = new Post({
            id: createRandomIdString(),
            imageUrl,
            title,
            text,
            postedAt: new Date(),
            postedUser: String(Object.values(userId)),
            createAt: null
        })
        await this.postRepo.save(postEntity);
    }
}
