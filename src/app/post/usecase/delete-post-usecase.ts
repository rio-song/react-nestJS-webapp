import { IPostRepository } from 'src/domain/repository-interface/post-repository'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class DeletePostUseCase {
    private readonly postRepo: IPostRepository

    public constructor(postRepo: IPostRepository) {
        this.postRepo = postRepo
    }

    public async do(params: { token: string, postId: string }) {
        if (params.token == null || params.token == undefined || params.token == ""
            || params.postId == null || params.postId == undefined || params.postId == "") {
            const e = new Error('badrequest')
            return Promise.reject(e.message);
        }
        const {
            token,
            postId,
        } = params
        const tokenError = await new DomainService().tokenCheck(token);
        if (tokenError === 'tokenError') {
            return 'tokenError'
        }
        await this.postRepo.delete(postId);

    }
}
