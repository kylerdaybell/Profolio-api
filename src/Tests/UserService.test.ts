import {UserService} from "../Services/UserService";
import {MockUserRepository} from "../Repositories/MockUserRepository";

let userService = new UserService(new MockUserRepository());

test("this is a fake test",()=>{
    expect(true).toBe(true);
})