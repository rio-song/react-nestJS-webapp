import { ApiProperty } from '@nestjs/swagger'
import { PostDTO } from 'src/app/post/post-qs-if'

export class GetAllPostsResponse {
    @ApiProperty({ type: () => [Post] })
    Post: Post[]

    public constructor(params: { Posts: PostDTO[] }) {
        const { Posts } = params
        this.Post = Posts.map(({ id, imageUrl, title, postedAt, favosCount, commentsCount, lastPostId }) => {
            return new Post({
                id,
                imageUrl,
                title,
                postedAt,
                favosCount,
                commentsCount,
                lastPostId
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
    commentsCount: number

    @ApiProperty()
    lastPostId: string

    public constructor(params: {
        id: string
        imageUrl: string
        title: string
        postedAt: Date
        favosCount: number
        commentsCount: number
        lastPostId: string
    }) {
        this.id = params.id
        this.imageUrl = params.imageUrl
        this.title = params.title
        this.postedAt = params.postedAt
        this.favosCount = params.favosCount
        this.commentsCount = params.commentsCount
        this.lastPostId = params.lastPostId
    }
}
