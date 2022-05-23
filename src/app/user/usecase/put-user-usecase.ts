import { User } from 'src/domain/entity/user'
import { IUserRepository } from 'src/domain/repository-interface/user-repository'
import { createRandomIdString } from 'src/util/random'
import { DomainService } from 'src/domain/domain-service/domain-service'

export class PutUserUseCase {
    private readonly userRepo: IUserRepository

    public constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    public async do(params: {
        token: string,
        userId: string;
        firstName: string; familyName: string;
        nickName: string; imageUrl: string; email: string;
        password: string;
    }) {
        try {
            if (params.token == null || params.token == undefined || params.token == ""
                || params.userId == null || params.userId == undefined || params.userId == ""
                || params.firstName == null || params.firstName == undefined || params.firstName == ""
                || params.familyName == null || params.familyName == undefined || params.familyName == ""
                || params.nickName == null || params.nickName == undefined || params.nickName == ""
                || params.email == null || params.email == undefined || params.email == ""
                || params.password == null || params.password == undefined || params.password == "") {
                const e = new Error('notFoundAccount')
                return Promise.reject(e.message);
            }
            const { token, firstName, familyName, nickName, imageUrl, email, password,
            } = params
            const tokenError = await new DomainService().tokenCheck(token);
            if (tokenError === 'tokenError') {
                return 'tokenError'
            }
            const emailDoubleError = await new DomainService().emailDoubleCheck(email)
            if (emailDoubleError === 'emailDoubleError') {
                return 'emailDoubleError'
            }

            const userEntity = new User({
                id: createRandomIdString(),
                firstName: firstName,
                familyName: familyName,
                nickName: nickName,
                imageUrl: imageUrl,
                email: email,
                password: password,
                registeredAt: new Date(),
                createdAt: null
            })
            await this.userRepo.save(userEntity);
            return userEntity.getAllProperties().id
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
