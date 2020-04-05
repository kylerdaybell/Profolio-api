import { Request, Response } from "express"
import { IAuthenticationService } from "./IAuthenticateService";
import { User } from "../Models/UserModel";
import { IUserService } from "./IUserService";

const jwt = require('jsonwebtoken');

export class JWTAuthenticationService implements IAuthenticationService{
    private iuserservice: IUserService;
    constructor( iuserservice :IUserService){
        this.iuserservice = iuserservice;
    }


    public async AuthenticateUser(req: Request, res: Response): Promise<void> {
        const user  = new User(null,req.body.User.Email,req.body.User.Password,req.body.User.Authorization);
        if(await this.iuserservice.ValidateUser(user)){
            const tokenUser = {email: user.email,authorization: user.authorization}
            const accessToken = jwt.sign(tokenUser,process.env.ACCESS_TOKEN);
            res.json({accessToken: accessToken});
        }
    }
    
    public async authenticateToken(req: Request, res: Response, Next: Function): Promise<any>{
        const authHeader = req.headers.authorization;
        console.log(process.env.ACCESS_TOKEN)
        const token = authHeader && authHeader.split(' ')[1]
        if(token == null){
            return res.sendStatus(401);
        }
        jwt.verify(token,process.env.ACCESS_TOKEN,(err:any,user:any)=>{
            if(err){
                return res.sendStatus(403)
            }
            Next();
        })
    }   

}
