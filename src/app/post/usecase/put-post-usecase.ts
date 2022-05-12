import { Post } from 'src/domain/entity/post'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'


export class PutPostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { token: string, userId: string, postId: string, imageUrl: string, title: string, text: string, }) {
        const {
            token,
            userId,
            postId,
            imageUrl,
            title,
            text,
        } = params
        await new DomainService().tokenCheck(token);
        const post = await this.postRepo.getPost(postId);

        const postEntity = new Post({
            id: postId,
            imageUrl,
            title,
            text,
            postedAt: new Date(),
            postedUser: String(Object.values(userId)),
            createAt: post.getCreateAt()
        })

        await this.postRepo.update(postEntity);

    }
}

