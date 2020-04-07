import { IPostRepository } from "./IPostRepository";
import { Post } from "../Models/PostModel";

export class MySqlPostRepository implements IPostRepository{
    CreatePost(post: Post): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}