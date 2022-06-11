import { PrismaClient } from '@prisma/client'

export class DomainService {

    public async emailDoubleCheck(email: string) {
        const emailDouble = await new PrismaClient().user.findMany({
            where: {
                email: email
            },
        })

        if (emailDouble.length > 0) {
            const e = new Error('emailDoubleError')
            return e.message;
        }
    }

    public async tokenCheck(token: string) {

        const jwt = require("jsonwebtoken");
        const SECRET_KEY = "abcdefg";
        // トークンの検証
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            // if (decoded) {
            //     return 'OK'
            // } else {
            if (err) {
                const e = new Error('tokenError')
                return e.message;
            }
        });
        return 'OK'
    }
}