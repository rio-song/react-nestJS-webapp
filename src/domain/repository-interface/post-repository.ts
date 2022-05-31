import { Post } from "../entity/post";

export interface IPostRepository {
    save(Post: Post): Promise<Post>
    update(Post: Post): Promise<Post>
    delete(postId: string): Promise<boolean>
    getPost(postId: string): Promise<Post>
}
