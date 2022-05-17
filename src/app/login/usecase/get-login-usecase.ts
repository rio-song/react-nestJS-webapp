import { ILoginQS } from '../login-qs-if'


export class GetLoginUseCase {
    private readonly loginQS: ILoginQS
    public constructor(loginQS: ILoginQS) {
        this.loginQS = loginQS
    }
    public async do(params: { email: string, password: string }) {
        try {
            const login = await this.loginQS.getLogin(params.email, params.password);

            console.log('Loginの中身の確認' + login)
            const jwt = require("jsonwebtoken");

            const payload = {
                user: login.userId
            };
            const SECRET_KEY = "abcdefg";
            const option = {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
            const token = jwt.sign(payload, SECRET_KEY, option);
            await this.loginQS.setToken(login.userId, token);

            return { token: token, userId: login.userId }
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
