import { Comment } from "../entity/comment";

export interface ICommentRepository {
    save(Comment: Comment): Promise<Comment>
    update(Comment: Comment): Promise<Comment>
    delete(postId: string, userId: string, commentId: string): Promise<boolean>
    getComment(commentId: string): Promise<Comment>
}
