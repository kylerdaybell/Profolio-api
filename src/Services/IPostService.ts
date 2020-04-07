import { User } from "../Models/UserModel";
import { Post } from "../Models/PostModel";

export interface IPostService{
    CreatePost(post:Post):Promise<boolean>;
}