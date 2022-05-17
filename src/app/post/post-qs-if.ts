export class PostDTO {
    public readonly id: string
    public readonly imageUrl: string
    public readonly title: string
    public readonly text: string
    public readonly postedAt: Date
    public readonly favosCount: number
    public readonly favoStatus: boolean
    public readonly commentsCount: number
    public readonly lastPostId: string

    public constructor(props: { id: string; imageUrl: string; title: string; text: string; postedAt: Date; favosCount: number; favoStatus: number; commentsCount: number; lastPostId: string }) {
        const { id, imageUrl, title, text, postedAt, favosCount, favoStatus, commentsCount, lastPostId } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.favosCount = favosCount
        if (favoStatus > 0) {
            this.favoStatus = true
        } else if (favoStatus === 0) {
            this.favoStatus = false
        } else {
            this.favoStatus = null
        }
        this.commentsCount = commentsCount
        this.lastPostId = lastPostId
    }
}

export interface IPostQS {
    getPostsAll(count: number, lastPostId: string | null): Promise<PostDTO[]>
    getPostsAllwithFavoStatus(userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]>
    getPostsUserAll(userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]>
}