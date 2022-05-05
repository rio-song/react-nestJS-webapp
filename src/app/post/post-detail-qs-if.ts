export class PostDetailDTO {
    public readonly id: string
    public readonly imageUrl: string
    public readonly title: string
    public readonly text: string
    public readonly postedAt: Date
    public readonly favosCount: number
    public readonly commentsCount: number
    public readonly comments: CommentDTO[]

    public constructor(props: { id: string; imageUrl: string; title: string; text: string; postedAt: Date; favosCount: number; commentsCount: number; comments: CommentDTO[]; }) {
        const { id, imageUrl, title, text, postedAt, favosCount, commentsCount, comments } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.favosCount = favosCount
        this.commentsCount = commentsCount
        this.comments = comments
    }
}

export interface IPostDetailQS {
    getPostDetail(postId: string): Promise<PostDetailDTO>
}

export class CommentDTO {
    public readonly id: string
    public readonly comment: string
    public readonly commentedUserId: string
    public readonly commentededAt: Date

    public constructor(props: {
        id: string;
        comment: string
        commentedUserId: string
        commentededAt: Date
    }) {
        const { id, comment, commentedUserId, commentededAt } = props
        this.id = id
        this.comment = comment
        this.commentedUserId = commentedUserId
        this.commentededAt = commentededAt
    }
}