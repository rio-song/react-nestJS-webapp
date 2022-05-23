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
                imageUrl,
                title,
                text,
            } = params
            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
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
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
