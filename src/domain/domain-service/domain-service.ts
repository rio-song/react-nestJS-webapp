import { PrismaClient } from '@prisma/client'

export class DomainService {

    public async emailDoubleCheck(email: string) {
        const emailDoubleCheck = await new PrismaClient().user.findFirst({
            where: {
                email: email
            },
        })
        if (emailDoubleCheck !== null) {
            throw new Error("既に存在するユーザーです")
        }
    }

    public async tokenCheck(token: string) {

        const jwt = require("jsonwebtoken");

        const SECRET_KEY = "abcdefg";
        // トークンの検証
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (decoded) {
                console.log("OK")
                // 認証NGの場合
                return
            } else {
                console.log("エラー内容" + err)
                throw new Error("認証エラー")
            }
        });
    }
}