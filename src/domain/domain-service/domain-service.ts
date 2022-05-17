import { PrismaClient } from '@prisma/client'

export class DomainService {

    public async emailDoubleCheck(email: string) {
        const emailDoubleCheck = await new PrismaClient().user.findFirst({
            where: {
                email: email
            },
        })
        if (emailDoubleCheck !== null) {
            const e = new Error('emailDoubleError')
            return e.message;
        }
    }

    public async tokenCheck(token: string) {

        const jwt = require("jsonwebtoken");

        const SECRET_KEY = "abcdefg";
        // トークンの検証
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (decoded) {
                return
            } else {
                const e = new Error('tokenError')
                return e.message;
            }
        });
    }
}