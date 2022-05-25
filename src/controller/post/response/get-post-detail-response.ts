import { ApiProperty } from '@nestjs/swagger'
import { PostDetailDTO } from 'src/app/post/post-detail-qs-if'

export class GetPostDetailResponse {
    PostDetail: PostDetail

    public constructor(params: { PostDetails: PostDetailDTO }) {
        const { PostDetails } = params
        this.PostDetail = new PostDetail({
            id: PostDetails.id,
            imageUrl: PostDetails.imageUrl,
            title: PostDetails.title,
            text: PostDetails.text,
            postedAt: PostDetails.postedAt,
            favosCount: PostDetails.favosCount,
            favo: PostDetails.favo,
            nickName: PostDetails.nickName,
            userId: PostDetails.userId,
            userImageUrl: PostDetails.userImageUrl,
            commentsCount: PostDetails.commentsCount,
            comments: PostDetails.comments.map(({
                id, comment, commentedUserId, commentededAt
            }) => {
                return new Comment({
                    id,
                    comment,
                    commentedUserId,
                    commentededAt
                })
            })
        })
    }
}

class PostDetail {

    @ApiProperty()
    id: string

    @ApiProperty()
    imageUrl: string

    @ApiProperty()
    title: string

    @ApiProperty()
    text: string

    @ApiProperty()
    postedAt: Date

    @ApiProperty()
    favosCount: number

    @ApiProperty()
    favo: boolean

    @ApiProperty()
    userId: string

    @ApiProperty()
    nickName: string

    @ApiProperty()
    userImageUrl: string

    @ApiProperty()
    commentsCount: number

    @ApiProperty({ type: () => [Comment] })
    comments: Comment[]

    public constructor(params: {
        id: string
        imageUrl: string
        title: string
        text: string
        postedAt: Date
        favosCount: number
        favo: boolean
        userId: string
        nickName: string
        userImageUrl: string
        commentsCount: number
        comments: Comment[]
    }) {
        this.id = params.id
        this.imageUrl = params.imageUrl
        this.title = params.title
        this.text = params.text
        this.postedAt = params.postedAt
        this.favo = params.favo
        this.favosCount = params.favosCount
        this.userId = params.userId
        this.nickName = params.nickName
        this.userImageUrl = params.userImageUrl
        this.commentsCount = params.commentsCount
        this.comments = params.comments
    }
}


class Comment {
    @ApiProperty()
    id: string

    @ApiProperty()
    comment: string

    @ApiProperty()
    commentedUserId: string

    @ApiProperty()
    commentededAt: Date

    public constructor(params: {
        id: string
        comment: string
        commentedUserId: string
        commentededAt: Date
    }) {
        this.id = params.id
        this.comment = params.comment
        this.commentedUserId = params.commentedUserId
        this.commentededAt = params.commentededAt

    }
}

