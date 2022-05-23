import { ILoginRepository } from "src/domain/repository-interface/login-repository";

export class GetLoginUseCase {
    private readonly loginRepo: ILoginRepository

    public constructor(loginRepo: ILoginRepository) {
        this.loginRepo = loginRepo
    }

    public async do(params: { email: string, password: string }) {
        try {
            console.log("中身email:" + params.email)
            console.log("password:" + params.password)
            if (params.email == null || params.email == undefined || params.email == "") {
                console.log("エラーか")
                const e = new Error('notFoundAccount')
                return Promise.reject(e.message);
            }
            const userId = await this.loginRepo.getLogin(params.email, params.password);
            const jwt = require("jsonwebtoken");

            const payload = {
                userId: userId
            };
            const SECRET_KEY = "abcdefg";
            const option = {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
            const token = jwt.sign(payload, SECRET_KEY, option);
            await this.loginRepo.setToken(userId, token);

            return { token: token, userId: userId }
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
