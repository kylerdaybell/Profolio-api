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
            const tokenUser = {email: user.email,password: user.password,authorization: user.authorization}
            const accessToken = jwt.sign(tokenUser,process.env.ACCESS_TOKEN);
            res.json({accessToken: accessToken});
        }
    }


    public async AuthorizeToken(req:Request,res:Response,level: string):Promise<any>{
        let user = await this.GetSessionUser(req,res);
        if(user.authorization == level){
            return user;
        }
        return null;
    }
    

    public async AuthenticateToken(req: Request, res: Response): Promise<boolean>{
        try{
            const token = this.GetToken(req,res);
            if(token == null){
                res.sendStatus(401)
                throw new Error("token null")
            }
            jwt.verify(token,process.env.ACCESS_TOKEN,(err:any,user:any)=>{
                if(err){
                    res.sendStatus(403)
                    throw new Error("Invalid Token")
                }
            })
            return true
        }catch(e){
            return false;
        }
    }

    private async GetSessionUser(req: Request,res: Response): Promise<any>{
        if(await this.AuthenticateToken(req,res)){
            let token = this.GetToken(req,res)
            let decoded = jwt.decode(token, {complete: true});
            let user = new User(null,decoded.payload.email,decoded.payload.password,decoded.payload.authorization)
            return user
        }
        return null
    }

    private GetToken(req:Request,res:Response):any{
        const authHeader = req.headers.authorization;
        console.log(process.env.ACCESS_TOKEN)
        const token = authHeader && authHeader.split(' ')[1]
        return token;
    }
}
