import { IUserController } from "./IUserController";
import { Request, Response } from "express";
import { User } from "../Models/UserModel";
import { IUserService } from "../Services/IUserService";
import { IAuthenticationService } from "../Services/IAuthenticateService";


export class UserController implements IUserController{
    private iuserservice: IUserService;
    private iauthenticationservice:IAuthenticationService;
    constructor( iuserservice :IUserService,iauthenticationservice:IAuthenticationService){
        this.iuserservice = iuserservice;
        this.iauthenticationservice = iauthenticationservice;
    }
    async PostRegister(req: Request, res: Response):Promise<void> {
        let user = new User(null,req.body.User.Email,req.body.User.Password,req.body.User.Authorization);
        if(await this.iuserservice.CreateUser(user)){
            res.write(JSON.stringify({Status:"success",Message:"The user was successfuly added to the database"}));
            res.end(); 
            return;         
        }else{
            res.write(JSON.stringify({Status:"faliure",Message:"Failed to add the user to the database"}));
            res.end(); 
            return;
        }
    }
    async PostLogin(req: Request, res: Response):Promise<void>{
        let user = new User(null,req.body.User.Email,req.body.User.Password,req.body.User.Authorization);
        if(await this.iuserservice.ValidateUser(user)){
            res.write(JSON.stringify({Status:"success",Message:"the user was successfully validated"}));
            res.end(); 
        }else {
            res.write(JSON.stringify({Status:"faliure",Message:"The user does not exsist or the password is incorrect"}));
            res.end(); 
        }
    }
    async PostDeleteUser(req: Request, res: Response):Promise<void>  {
        let user = new User(null,req.body.User.Email,req.body.User.Password,req.body.User.Authorization);
        if(await this.iuserservice.RemoveUser(user)){
            res.write(JSON.stringify({Status:"success",Message:"the user was successfully removed."}));
            res.end();
            return 
        }else{
            res.write(JSON.stringify({Status:"faliure",Message:"The user does not exsist or the password is incorrect"}));
            res.end(); 
            return
        }
    }

    async GetRoot(req: Request,res: Response): Promise<void>{
        let user = await this.iauthenticationservice.AuthorizeToken(req,res,"admin");
        if(user){
            let response: string = JSON.stringify({Message:"Welcome to the UPLoad API"});
            res.write(response);
            res.end();
        }

    } 

}