import { User } from 'src/domain/entity/user'
import { createRandomIdString } from 'src/util/random'
import { IUserRepository } from 'src/domain/repository-interface/user-repository'

export class PostUserUseCase {
    private readonly userRepo: IUserRepository

    public constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo
    }

    public async do(params: {
        firstName: string; familyName: string;
        nickName: string; imageUrl: string; email: string;
        password: string;
    }) {
        const { firstName, familyName, nickName, imageUrl, email, password,
        } = params

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
    }
}
