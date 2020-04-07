import { IPostService } from "./IPostService";
import {IPostRepository} from "../Repositories/IPostRepository"
import { User } from "../Models/UserModel";
import { Post } from "../Models/PostModel";

export class PostService implements IPostService{
    private postrepository: IPostRepository;
    constructor(IPostRepository: IPostRepository){
        this.postrepository = IPostRepository;
    }
    CreatePost(post: Post): Promise<boolean> {
        return Promise.resolve(true);
    }

}