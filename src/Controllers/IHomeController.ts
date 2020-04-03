import { Request, Response } from "express";

export interface IHomeController{
    GetRoot(req:Request,res:Response):void;
}