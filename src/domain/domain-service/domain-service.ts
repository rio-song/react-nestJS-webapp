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

        const tokenCheckDB = await new PrismaClient().login.findFirst({
            where: {
                token: token
            },
        })
        if (tokenCheckDB == null) {
            throw new Error("存在しないトークンです")
        }

        const express = require("express");
        const jwt = require("jsonwebtoken");

        const app = express();
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }));

        const SECRET_KEY = "abcdefg";

        // トークンの検証
        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err) {
                // 認証NGの場合
                throw new Error("認証エラー")
            }
        });
    }
}