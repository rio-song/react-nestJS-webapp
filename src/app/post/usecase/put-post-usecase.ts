import { Post } from 'src/domain/entity/post'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'


export class PutPostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { userId: string, postId: string, imageUrl: string, title: string, text: string, }) {
        const {
            userId,
            postId,
            imageUrl,
            title,
            text,
        } = params

        const post = await this.postRepo.getPost(postId);

        const postEntity = new Post({
            id: postId,
            imageUrl,
            title,
            text,
            postedAt: new Date(),
            postedUser: userId,
            createAt: post.getCreateAt()
        })

        await this.postRepo.update(postEntity);

    }
}

