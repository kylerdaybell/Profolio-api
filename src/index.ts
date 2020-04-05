import express from "express";
import {HomeController} from "./Controllers/HomeController";
import { UserController } from "./Controllers/UserController";
import {MySqlUserRepository} from "./Repositories/MySqlUserRepository";
import * as dotenv from "dotenv";
import { UserService } from "./Services/UserService";
import { JWTAuthenticationService } from "./Services/JWTAuthenticateService";
import { DummyUserService } from "./Services/DummyUserService";
const result = dotenv.config()

if (result.error) {
  throw result.error
}

const IUserRepository = new MySqlUserRepository();
const IUserService = new DummyUserService(IUserRepository);
let homecontroller = new HomeController();
let IAuthenticationService = new JWTAuthenticationService(IUserService);
let usercontroller = new UserController(IUserService,IAuthenticationService);






const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

console.log(process.env.PORT)
console.log(process.env.ACCESS_TOKEN)

app.get('/',(req,res)=>usercontroller.GetRoot(req,res));
app.post('/Register',(req,res)=>usercontroller.PostRegister(req,res))
app.post('/Login',(req,res)=>IAuthenticationService.AuthenticateUser(req,res))
app.post('/DeleteAccount',(req,res)=>usercontroller.PostDeleteUser(req,res));
app.post('/createpost',)
app.listen(80, () =>
  console.log('Example app listening on port 80!'),
);