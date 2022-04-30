
export class Comment {
    private id: string
    private commentedUserId: string
    private postId: string
    private comment: string
    private commentedAt: Date
    private createAt: Date

    public constructor(props: { id: string; commentedUserId: string; postId: string; comment: string; commentedAt: Date; createAt: Date; }) {
        const { id, commentedUserId, postId, comment, commentedAt, createAt } = props
        this.id = id
        this.commentedUserId = commentedUserId
        this.postId = postId
        this.comment = comment
        this.commentedAt = commentedAt
        this.createAt = createAt
    }

    public getAllProperties() {
        return {
            id: this.id,
            commentedUserId: this.commentedUserId,
            postId: this.postId,
            comment: this.comment,
            commentedAt: this.commentedAt,
            createAt: this.createAt
        }
    }
    public getCreateAt() {
        return this.createAt
    }

}