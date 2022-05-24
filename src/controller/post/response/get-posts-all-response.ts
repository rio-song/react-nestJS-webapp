import { ApiProperty } from '@nestjs/swagger'
import { PostDTO } from 'src/app/post/post-qs-if'

export class GetPostsAllResponse {
    @ApiProperty({ type: () => [Post] })
    Post: Post[]

    public constructor(params: { Posts: PostDTO[] }) {
        const { Posts } = params
        this.Post = Posts.map(({ id, imageUrl, title, postedAt, favosCount, favoStatus,
            commentsCount, lastPostId, nickName, userId }) => {
            return new Post({
                id,
                imageUrl,
                title,
                postedAt,
                favosCount,
                favoStatus,
                commentsCount,
                lastPostId,
                userId,
                nickName,
            })
        })
    }
}

class Post {
    @ApiProperty()
    id: string

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    title: string

    @ApiProperty()
    postedAt: Date

    @ApiProperty()
    favosCount: number

    @ApiProperty()
    favoStatus: boolean

    @ApiProperty()
    commentsCount: number

    @ApiProperty()
    lastPostId: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    nickName: string

    public constructor(params: {
        id: string
        imageUrl: string
        title: string
        postedAt: Date
        favoStatus: boolean
        favosCount: number
        commentsCount: number
        lastPostId: string
        userId: string
        nickName: string
    }) {
        this.id = params.id
        this.imageUrl = params.imageUrl
        this.title = params.title
        this.postedAt = params.postedAt
        this.favoStatus = params.favoStatus
        this.favosCount = params.favosCount
        this.commentsCount = params.commentsCount
        this.lastPostId = params.lastPostId
        this.userId = params.userId
        this.nickName = params.nickName
    }
}
