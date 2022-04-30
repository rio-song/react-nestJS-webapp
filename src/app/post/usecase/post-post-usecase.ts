import { Post } from 'src/domain/entity/post'
import { createRandomIdString } from 'src/util/random'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'

export class PostPostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { userId: string, imageUrl: string, title: string, text: string, }) {
        const {
            userId,
            imageUrl,
            title,
            text,
        } = params

        const postEntity = new Post({
            id: createRandomIdString(),
            imageUrl,
            title,
            text,
            postedAt: new Date(),
            postedUser: userId,
            createAt: null
        })
        await this.postRepo.save(postEntity);
    }
}
