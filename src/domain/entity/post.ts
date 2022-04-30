
export class Post {
    private id: string
    private imageUrl: string
    private title: string
    private text: string
    private postedAt: Date
    private postedUser: string
    private createAt: Date | null

    public constructor(props: { id: string; imageUrl: string; title: string; text: string; postedAt: Date; postedUser: string; createAt: Date | null }) {
        const { id, imageUrl, title, text, postedAt, postedUser, createAt } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.postedUser = postedUser
        this.createAt = createAt
    }

    public getAllProperties() {
        return {
            id: this.id,
            imageUrl: this.imageUrl,
            title: this.title,
            text: this.text,
            postedAt: this.postedAt,
            postedUser: this.postedUser,
            createAt: this.createAt
        }
    }

    public getCreateAt() {
        return this.createAt
    }

}