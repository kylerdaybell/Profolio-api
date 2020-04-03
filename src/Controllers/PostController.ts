import {IPostController} from './IPostController'
import { Request, Response } from "express";
import { User } from '../Models/UserModel';
import { Post } from '../Models/PostModel';
import { IUserService } from '../Services/IUserService';


export class PostController implements IPostController{
    readonly iuserservice: IUserService;
    constructor(iuserservice :IUserService){
        this.iuserservice = iuserservice;
    }
    PostCreatePost(req: Request, res: Response): void {
        let user = new User(null,req.body.User.Username,req.body.User.Password,req.body.User.Authorization);
        //let post = new Post(req.body.Post.Username)
    }

}