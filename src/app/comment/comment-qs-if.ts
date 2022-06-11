export class CommentDTO {
    public readonly id: string
    public readonly comment: string
    public readonly commentedUserId: string
    public readonly commentededAt: Date
    public readonly commentedUserImageUrl: string
    public readonly commentedUserNickName: string

    public constructor(props: {
        id: string;
        comment: string
        commentedUserId: string
        commentededAt: Date
        commentedUserImageUrl: string
        commentedUserNickName: string
    }) {
        const { id, comment, commentedUserId, commentededAt,
            commentedUserImageUrl, commentedUserNickName } = props
        this.id = id
        this.comment = comment
        this.commentedUserId = commentedUserId
        this.commentededAt = commentededAt
        this.commentedUserImageUrl = commentedUserImageUrl
        this.commentedUserNickName = commentedUserNickName
    }
}

export interface ICommentQS {
    getComment(postId: string): Promise<CommentDTO[]>
}
