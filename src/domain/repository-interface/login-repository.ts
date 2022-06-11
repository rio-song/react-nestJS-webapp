
export interface ILoginRepository {
    getLogin(email, password): Promise<string>
    setToken(userId: string, token: string): Promise<boolean>
}
