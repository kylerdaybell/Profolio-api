import { Request, Response } from "express"
import {IHomeController} from "./IHomeController"


export class HomeController implements IHomeController{
    public GetRoot(req: Request,res: Response): void{
        let response: string = JSON.stringify({Message:"Welcome to the UPLoad API"});
        res.write(response);
        res.end();
    } 
}
 