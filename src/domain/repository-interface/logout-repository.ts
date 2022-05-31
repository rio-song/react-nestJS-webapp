
export interface ILogoutRepository {
    logout(token: string): Promise<boolean>
}
