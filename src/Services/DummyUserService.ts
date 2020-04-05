import {IUserService} from "./IUserService"
import { User } from "../Models/UserModel";
import { IUserRepository } from "../Repositories/IUserRepository";

export class DummyUserService implements IUserService{
    constructor(iuserrepository: IUserRepository){
    }
    async ValidateUser(user: User): Promise<boolean> {
        if(user.email == "kyler.daybell@gmail.com" && user.password == "kyler" && user.authorization == "admin"){
            return true
        }
    }
    async RemoveUser(user: User): Promise<boolean> {
        return true
    }
    async CreateUser(user: User): Promise<boolean> {
        return true
    }
    async GetUserByEmail(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}