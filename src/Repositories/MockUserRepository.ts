import { User } from "../Models/UserModel";
import { IUserRepository } from "./IUserRepository";

export class MockUserRepository implements IUserRepository {
    public AddNewUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    public GetExsistingUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public RemoveUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
