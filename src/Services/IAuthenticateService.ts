import { Request, Response } from "express"

export interface IAuthenticationService{
    AuthenticateUser(req: Request,res:Response):Promise<any>;
}