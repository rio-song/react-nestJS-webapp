import { Comment } from "../entity/comment";

export interface ICommentRepository {
    save(Comment: Comment): Promise<Comment>
    // update(Comment: Comment): Promise<Comment>
    delete(commentId: string): Promise<boolean>
    getComment(commentId: string): Promise<Comment>
}
