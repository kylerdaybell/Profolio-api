import { User } from "../Models/UserModel";
import { IUserRepository } from "../Repositories/IUserRepository";
import {IUserService} from "./IUserService";

export class DummyUserService implements IUserService {
    constructor(iuserrepository: IUserRepository) {
    }
    public async ValidateUser(user: User): Promise<boolean> {
        if (user.email == "kyler.daybell@gmail.com" && user.password == "kyler" && user.authorization == "admin") {
            return true;
        }
    }
    public async RemoveUser(user: User): Promise<boolean> {
        return true;
    }
    public async CreateUser(user: User): Promise<boolean> {
        return true;
    }
    public async GetUserByEmail(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

}
