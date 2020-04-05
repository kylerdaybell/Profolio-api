import { Request, Response } from "express"

export interface IAuthenticationService{
    AuthenticateUser(req: Request,res:Response):Promise<any>;
    AuthenticateToken(req: Request, res: Response): Promise<boolean>;
    AuthorizeToken(req:Request,res:Response,level: string):Promise<any>
}