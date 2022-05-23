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
    }
}
