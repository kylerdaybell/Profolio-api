import { Request, Response } from "express";

export interface IPostController{
    PostCreatePost(req:Request,res:Response):void;
}