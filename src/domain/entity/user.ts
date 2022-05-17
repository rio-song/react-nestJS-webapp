
export class User {
    private id: string
    private firstName: string
    private familyName: string
    private nickName: string
    private imageUrl: string | null
    private email: string
    private password: string
    private registeredAt: Date
    private createdAt: Date | null

    public constructor(props: {
        id: string; firstName: string; familyName: string;
        nickName: string; imageUrl: string | null; email: string;
        password: string; registeredAt: Date; createdAt: Date | null;
    }) {
        const { id, firstName, familyName, nickName, imageUrl, email, password,
            registeredAt, createdAt, } = props
        this.id = id
        this.firstName = firstName
        this.familyName = familyName
        this.nickName = nickName
        this.imageUrl = imageUrl
        this.email = email
        this.password = password
        this.registeredAt = registeredAt
        this.createdAt = createdAt
    }

    public getAllProperties() {
        return {
            id: this.id,
            firstName: this.firstName,
            familyName: this.familyName,
            nickName: this.nickName,
            imageUrl: this.imageUrl,
            email: this.email,
            password: this.password,
            registeredAt: this.registeredAt,
            createdAt: this.createdAt
        }
    }
}