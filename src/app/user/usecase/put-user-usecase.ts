import { User } from 'src/domain/entity/user'
import { IUserRepository } from 'src/domain/repository-interface/user-repository'
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
        nickName: string; imageUrl: string; profileText: string | null; email: string;
        password: string;
    }) {
        console.log("ここまできているのか２")
        try {
            if (params.token == null || params.token == undefined || params.token == ""
                || params.userId == null || params.userId == undefined || params.userId == ""
                || params.firstName == null || params.firstName == undefined || params.firstName == ""
                || params.familyName == null || params.familyName == undefined || params.familyName == ""
                || params.nickName == null || params.nickName == undefined || params.nickName == ""
                || params.email == null || params.email == undefined || params.email == ""
                || params.password == null || params.password == undefined || params.password == "") {
                const e = new Error('badrequest')
                return Promise.reject(e.message);
            }
            const { token, userId, firstName, familyName, nickName, imageUrl, profileText, email, password,
            } = params
            console.log("ここまできているのか３")
            const tokenError = await new DomainService().tokenCheck(token);
            console.log("ここまできているのか4")
            if (tokenError === 'tokenError') {
                return 'tokenError'
            }

            const userCurrent = await this.userRepo.getUser(userId);
            if (userCurrent.getAllProperties().email != email) {

                console.log("ここまできているのか5")
                const emailDoubleError = await new DomainService().emailDoubleCheck(email)
                if (emailDoubleError === 'emailDoubleError') {
                    return 'emailDoubleError'
                }
            }
            console.log("ここまできているのか6")

            const userEntity = new User({
                id: userId,
                firstName: firstName,
                familyName: familyName,
                nickName: nickName,
                imageUrl: imageUrl,
                profileText: profileText,
                email: email,
                password: password,
                registeredAt: userCurrent.getAllProperties().registeredAt,
                createdAt: userCurrent.getAllProperties().createdAt
            })
            console.log("ここまできているのか7")
            await this.userRepo.update(userEntity);
            return
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
