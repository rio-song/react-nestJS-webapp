export class favoVO {
    private userId: string
    private postId: string

    public constructor(props: { userId: string; postId: string; }) {
        const { userId, postId } = props
        this.userId = userId
        this.postId = postId
    }

    public getAllProperties() {
        return {
            userId: this.userId,
            postId: this.postId,
        }
    }
}