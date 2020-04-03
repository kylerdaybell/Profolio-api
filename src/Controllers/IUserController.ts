import { Request, Response } from "express";

export interface IUserController{
    PostRegister(req:Request,res:Response):void;
    PostLogin(req: Request, res: Response):void
    PostDeleteUser(req: Request, res: Response):void;
}