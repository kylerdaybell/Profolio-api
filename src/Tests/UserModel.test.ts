import {User} from "../Models/UserModel"
const bcrypt = require('bcryptjs');

test("UserModel constructor runs properly",()=>{
    let user1 = new User(0,"kyler","1234","user")
    expect(user1.password).toBe("1234");
    expect(user1.email).toBe("kyler");
    expect(user1.authorization).toBe("user")
})

test("UserModel encrypting passwords returns an object with a properly encrypted password",()=>{
    let user1 = new User(0,"kyler","bobross","user")
    let user2 = user1.HashPassword();
    expect(bcrypt.compareSync(user1.password,user2.password)).toBe(true)
})

test("UserModel can validate passwords correctly",()=>{
    let user1 = new User(0,"kyler","bobross","user")
    let passwordmatches = user1.HashPassword().ValidatePassword("bobross");
    expect(passwordmatches).toBe(true);
})


