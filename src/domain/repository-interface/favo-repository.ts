import { favoVO } from "../entity/favoVO";

export interface IFavoRepository {
    save(favoVO: favoVO): Promise<favoVO>
    delete(postId: string, userId: string): Promise<boolean>
}
