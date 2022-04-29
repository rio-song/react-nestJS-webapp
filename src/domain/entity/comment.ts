
export class Comment {
    private id: string
    private userId: string
    private postId: string
    private comment: string
    private commented_at: Date

    public constructor(props: { id: string; userId: string; postId: string; comment: string; commented_at: Date; }) {
        const { id, userId, postId, comment, commented_at } = props
        this.id = id
        this.userId = userId
        this.postId = postId
        this.comment = comment
        this.commented_at = commented_at
    }

    public getAllProperties() {
        return {
            id: this.id,
            userId: this.userId,
            postId: this.postId,
            comment: this.comment,
            commented_at: this.commented_at,
        }
    }
    public getLessonId() {
        return this.id
    }

}