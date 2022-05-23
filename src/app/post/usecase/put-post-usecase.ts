import { Post } from 'src/domain/entity/post'
import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'


export class PutPostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { token: string, userId: string, postId: string, imageUrl: string, title: string, text: string, }) {
        try {
            if (params.token == null || params.token == undefined || params.token == ""
                || params.userId == null || params.userId == undefined || params.userId == ""
                || params.imageUrl == null || params.imageUrl == undefined || params.imageUrl == ""
                || params.text == null || params.text == undefined || params.text == ""
                || params.title == null || params.title == undefined || params.title == "") {
                const e = new Error('notFoundAccount')
                return Promise.reject(e.message);
            }
            const {
                token,
                userId,
                postId,
                imageUrl,
                title,
                text,
            } = params
            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
                return 'tokenError'
            }
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
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}

