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
    public readonly nickName: string
    public readonly userId: string
    public readonly userImageUrl: string
    public readonly textProfile: string

    public constructor(props: {
        id: string; imageUrl: string; title: string; text: string; postedAt: Date;
        favosCount: number; favoStatus: number; commentsCount: number; lastPostId: string;
        nickName: string; userId: string; userImageUrl: string; textProfile: string
    }) {
        const { id, imageUrl, title, text, postedAt, favosCount, favoStatus, commentsCount,
            lastPostId, nickName, userId, userImageUrl, textProfile } = props
        this.id = id
        this.imageUrl = imageUrl
        this.title = title
        this.text = text
        this.postedAt = postedAt
        this.favosCount = favosCount
        this.userId = userId
        this.userImageUrl = userImageUrl
        this.textProfile = textProfile
        console.log("favoStatus" + favoStatus)
        if (favoStatus > 0) {
            this.favoStatus = true
        } else if (favoStatus === 0) {
            this.favoStatus = false
        } else {
            this.favoStatus = null
        }
        console.log("favoStatus2" + favoStatus)
        this.commentsCount = commentsCount
        this.lastPostId = lastPostId
        this.nickName = nickName
    }
}

export interface IPostQS {
    getPostsAll(count: number, lastPostId: string | null): Promise<PostDTO[]>
    getPostsAllwithFavoStatus(userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]>
    getPostsUserAll(_token: string, userId: string, count: number, lastPostId: string | null): Promise<PostDTO[]>
}