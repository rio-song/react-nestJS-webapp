export class LogoutDTO {
    public constructor() { }
}

export interface ILogoutQS {
    logout(token: string): Promise<boolean>
}