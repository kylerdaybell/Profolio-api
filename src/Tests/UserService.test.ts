import {MockUserRepository} from "../Repositories/MockUserRepository";
import {UserService} from "../Services/UserService";

const userService = new UserService(new MockUserRepository());

test("this is a fake test", () => {
    expect(true).toBe(true);
});
