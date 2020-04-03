import { User } from "../Models/UserModel";
import { Post } from "../Models/PostModel";

export interface IPostService{
    CreatePost(user:User,post:Post):Promise<boolean>;
}