import { IPostService } from "./IPostService";
import {IPostRepository} from "../Repositories/IPostRepository"
import { User } from "../Models/UserModel";
import { Post } from "../Models/PostModel";
import { IUserRepository } from "../Repositories/IUserRepository";

export class PostService implements IPostService{
    private postrepository: IPostRepository;
    private userrepository: IUserRepository;
    constructor(IPostRepository: IPostRepository,IUserRepository: IUserRepository){
        this.postrepository = IPostRepository;
        this.userrepository = IUserRepository;
    }
    public async CreatePost(post: Post,user:User): Promise<boolean> {
        try{
            let DBUser = await this.userrepository.GetExsistingUser(user);
            let realpost = new Post(0,DBUser.id,post.title,post.content);
            return await this.postrepository.CreatePost(realpost);
        }catch(e){
            return Promise.resolve(false);
        }
    }

}