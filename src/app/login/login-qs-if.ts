export class LoginDTO {
    public readonly userId: string

    public constructor(props: {
        userId: string;
    }) {
        const { userId } = props
        this.userId = userId
    }
}

export interface ILoginQS {
    getLogin(email: string, password: string): Promise<LoginDTO>
    setToken(userId: string, token: string): Promise<boolean>
    checkLogin(userId: string): Promise<boolean>
}