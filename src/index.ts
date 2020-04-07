import express from "express";
import { UserController } from "./Controllers/UserController";
import {MySqlUserRepository} from "./Repositories/MySqlUserRepository";
import * as dotenv from "dotenv";
import { UserService } from "./Services/UserService";
import { JWTAuthenticationService } from "./Services/JWTAuthenticateService";
import { DummyUserService } from "./Services/DummyUserService";
import { PostController } from "./Controllers/PostController";
import { PostService } from "./Services/PostService";
import { MySqlPostRepository } from "./Repositories/MySqlPostRepository";
const result = dotenv.config()

if (result.error) {
  throw result.error
}
//repositorys
const IUserRepository = new MySqlUserRepository();
const IPostRepository = new MySqlPostRepository();

//services
const IUserService = new UserService(IUserRepository);
const IAuthenticationService = new JWTAuthenticationService(IUserService);
const IPostService = new PostService(IPostRepository,IUserRepository);

//controllers
const usercontroller = new UserController(IUserService,IAuthenticationService);
const postcontroller = new PostController(IAuthenticationService,IPostService)


const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

console.log(process.env.PORT)
console.log(process.env.ACCESS_TOKEN)

app.get('/',(req,res)=>usercontroller.GetRoot(req,res));
app.post('/Register',(req,res)=>usercontroller.PostRegister(req,res))
app.post('/Login',(req,res)=>IAuthenticationService.AuthenticateUser(req,res))
app.post('/DeleteAccount',(req,res)=>usercontroller.PostDeleteUser(req,res));
app.post('/createpost',(req,res)=>postcontroller.PostCreatePost(req,res))
app.listen(80, () =>
  console.log('Example app listening on port 80!'),
);