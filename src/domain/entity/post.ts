
export class Post {
    private id: string
    private imageUrl: string
    private title: string
    private text: string
    private posted_at: Date

    public constructor(props: { id: string; imageUrl: string; title: string; text: string; posted_at: Date; }) {
        const { id, imageUrl, title, text, posted_at } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.posted_at = posted_at
    }

    public getAllProperties() {
        return {
            id: this.id,
            imageUrl: this.imageUrl,
            title: this.title,
            text: this.text,
            posted_at: this.posted_at,
        }
    }

    public getLessonId() {
        return this.id
    }

}