import {IUserService} from "./IUserService"
import { User } from "../Models/UserModel";
import { IUserRepository } from "../Repositories/IUserRepository";

export class UserService implements IUserService{
    iuserrepository: IUserRepository;
    constructor(iuserrepository: IUserRepository){
        this.iuserrepository = iuserrepository
    }
    public async ValidateUser(user: User): Promise<boolean> {
        let DBUser = await this.iuserrepository.GetExsistingUser(user);
        if(DBUser.email !== "void" && DBUser.ValidatePassword(user.password)){
            return true; 
        }else {
            return false; 
        }
    }
    public async RemoveUser(user: User): Promise<boolean> {
        let DBUser = await this.iuserrepository.GetExsistingUser(user);
        if(DBUser.email !== "void" &&DBUser.ValidatePassword(user.password)){
            let result = this.iuserrepository.RemoveUser(DBUser);
            if(result){
                return true
            }
        }
        return false;
    }
    public async CreateUser(user: User): Promise<boolean> {
        let sercureuser = user.HashPassword();
        let result:boolean =  await this.iuserrepository.AddNewUser(sercureuser);
        if(result){
            return true;         
        }else{
            return false;
        }
    }
    public async GetUserByEmail(user: User): Promise<User> {
        let DBUser = await this.iuserrepository.GetExsistingUser(user);
        return DBUser;
    }
}
