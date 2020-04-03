import { Post } from "../Models/PostModel";

export interface IPostService{
    CreatePost(post:Post):Promise<boolean>;
}