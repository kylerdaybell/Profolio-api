import { IPostService } from "./IPostService";
import { IUserRepository } from "../Repositories/IUserRepository";

export class PostService implements IPostService{
    private iuserrepository: IUserRepository;
    constructor(iuserrepository: IUserRepository){
        this.iuserrepository = iuserrepository;
    }
    CreatePost(user: import("../Models/UserModel").User, post: import("../Models/PostModel").Post): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}