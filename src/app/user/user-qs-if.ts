export class UserDTO {
    public readonly id: string
    public readonly firstName: string
    public readonly familyName: string
    public readonly nickName: string
    public readonly imageUrl: string | null
    public readonly profileText: string | null
    public readonly email: string
    public readonly password: string
    public readonly registeredAt: Date

    public constructor(props: {
        id: string; firstName: string; familyName: string;
        nickName: string; imageUrl: string | null; profileText: string | null; email: string;
        password: string; registeredAt: Date; createdAt: Date; updatedAt: Date | null
    }) {
        const { id, firstName, familyName, nickName, imageUrl, profileText, email, password,
            registeredAt, } = props
        this.id = id
        this.firstName = firstName
        this.familyName = familyName
        this.nickName = nickName
        this.imageUrl = imageUrl
        this.profileText = profileText
        this.email = email
        this.password = password
        this.registeredAt = registeredAt
    }
}

export interface IUserQS {
    getUser(userId: string): Promise<UserDTO>
}