import { IUserController } from "./IUserController";
import { Request, Response } from "express";
import { User } from "../Models/UserModel";
import { IUserService } from "../Services/IUserService";

export class UserController implements IUserController{
    private iuserservice: IUserService;
    constructor( iuserservice :IUserService){
        this.iuserservice = iuserservice;
    }
    async PostRegister(req: Request, res: Response):Promise<void> {
        let user = new User(null,req.body.User.Username,req.body.User.Password,req.body.User.Authorization);
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
        let user = new User(null,req.body.User.Username,req.body.User.Password,req.body.User.Authorization);
        if(await this.iuserservice.ValidateUser(user)){
            res.write(JSON.stringify({Status:"success",Message:"the user was successfully validated"}));
            res.end(); 
        }else {
            res.write(JSON.stringify({Status:"faliure",Message:"The user does not exsist or the password is incorrect"}));
            res.end(); 
        }
    }
    async PostDeleteUser(req: Request, res: Response):Promise<void>  {
        let user = new User(null,req.body.User.Username,req.body.User.Password,req.body.User.Authorization);
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
}