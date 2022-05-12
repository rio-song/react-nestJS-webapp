import { ILoginQS } from '../login-qs-if'


export class GetLoginUseCase {
    private readonly loginQS: ILoginQS
    public constructor(loginQS: ILoginQS) {
        this.loginQS = loginQS
    }
    public async do(params: { email: string, password: string }) {
        try {
            const login = await this.loginQS.getLogin(params.email, params.password);
            const checkLogin = await this.loginQS.checkLogin(login.userId);

            const express = require("express");
            const jwt = require("jsonwebtoken");
            const app = express();
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }));
            const payload = {
                user: login.userId
            };
            const SECRET_KEY = "abcdefg";
            const option = {
                expiresIn: '10m'
            }
            const token = String(jwt.sign(payload, SECRET_KEY, option));
            await this.loginQS.setToken(login.userId, token);
            return { token: token, userId: login.userId }
        } catch (error) {
            // memo: エラー処理
            throw error
        }
    }
}
