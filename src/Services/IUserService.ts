import { User } from "../Models/UserModel";

export interface IUserService{
    ValidateUser(user:User):Promise<boolean>;
    RemoveUser(user:User):Promise<boolean>;
    CreateUser(user:User):Promise<boolean>;
    GetUserByEmail(user :User):Promise<User>;
}