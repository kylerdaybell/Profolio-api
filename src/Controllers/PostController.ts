import { Request, Response } from "express";
import { User } from '../Models/UserModel';
import { Post } from '../Models/PostModel';
import { IUserService } from '../Services/IUserService';
import { IAuthenticationService } from "../Services/IAuthenticationService";
import { IPostService } from "../Services/IPostService";



export class PostController{
    iauthenticationservice: IAuthenticationService;
    ipostservice: IPostService
    constructor(IAuthenticationService: IAuthenticationService, IPostService: IPostService){
        this.iauthenticationservice = IAuthenticationService;
        this.ipostservice = IPostService
    }
    public async PostCreatePost(req: Request, res: Response): Promise<void> {
        console.error(req.body)
        const user = await this.iauthenticationservice.AuthenticateToken(req,res);
        if(user){
           let post = new Post(0,user.id,req.body.Post.title,req.body.Post.content)
        if(await this.ipostservice.CreatePost(post,user)){
            res.write(JSON.stringify({Status:"success",Message:"Post created successfully"}));
            res.end();
            return 
        }else{
            res.write(JSON.stringify({Status:"failure",Message:"The post was not created"}));
            res.end();
            return
        }  
        }
    }

}