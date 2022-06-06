import { ApiProperty } from '@nestjs/swagger'
import { CommentDTO } from 'src/app/comment/comment-qs-if'

export class GetCommentsResponse {
    @ApiProperty({ type: () => [Comment] })
    Comment: Comment[]

    public constructor(params: { Comments: CommentDTO[] }) {
        const { Comments } = params
        this.Comment = Comments.map(({
            id, comment, commentedUserId, commentededAt, commentedUserImageUrl, commentedUserNickName
        }) => {
            return new Comment({
                id,
                comment,
                commentedUserId,
                commentededAt,
                commentedUserImageUrl,
                commentedUserNickName
            })
        })
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
    commentedUserImageUrl: string

    @ApiProperty()
    commentedUserNickName: string

    @ApiProperty()
    commentededAt: Date

    public constructor(params: {
        id: string
        comment: string
        commentedUserId: string
        commentedUserImageUrl: string
        commentedUserNickName: string
        commentededAt: Date
    }) {
        this.id = params.id
        this.comment = params.comment
        this.commentedUserId = params.commentedUserId
        this.commentededAt = params.commentededAt
        this.commentedUserImageUrl = params.commentedUserImageUrl
        this.commentedUserNickName = params.commentedUserNickName
    }
}

