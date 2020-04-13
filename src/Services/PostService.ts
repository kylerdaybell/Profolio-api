import { Post } from "../Models/PostModel";
import { User } from "../Models/UserModel";
import {IPostRepository} from "../Repositories/IPostRepository";
import { IUserRepository } from "../Repositories/IUserRepository";
import { IPostService } from "./IPostService";

export class PostService implements IPostService {
    private postrepository: IPostRepository;
    private userrepository: IUserRepository;
    constructor(IPostRepository: IPostRepository, IUserRepository: IUserRepository) {
        this.postrepository = IPostRepository;
        this.userrepository = IUserRepository;
    }
    public async CreatePost(post: Post, user: User): Promise<boolean> {
        try {
            const DBUser = await this.userrepository.GetExsistingUser(user);
            const realpost = new Post(0, DBUser.id, post.title, post.content);
            return await this.postrepository.CreatePost(realpost);
        } catch (e) {
            return Promise.resolve(false);
        }
    }

}
