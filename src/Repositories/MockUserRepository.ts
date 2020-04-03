import { IUserRepository } from "./IUserRepository";
import { User } from "../Models/UserModel";

export class MockUserRepository implements IUserRepository{
    AddNewUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }    
    GetExsistingUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    RemoveUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}