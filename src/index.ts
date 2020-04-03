import express from "express";
import {HomeController} from "./Controllers/HomeController";
import { UserController } from "./Controllers/UserController";
import {MySqlUserRepository} from "./Repositories/MySqlUserRepository";
import * as dotenv from "dotenv";
import { UserService } from "./Services/UserService";

const IUserRepository = new MySqlUserRepository();
const IUserService = new UserService(IUserRepository);
let homecontroller = new HomeController();
let usercontroller = new UserController(IUserService);


const result = dotenv.config()

if (result.error) {
  throw result.error
}

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));

console.log(process.env.PORT)

app.get('/',(req,res)=>homecontroller.GetRoot(req,res));
app.post('/Register',(req,res)=>usercontroller.PostRegister(req,res))
app.post('/Login',(req,res)=>usercontroller.PostLogin(req,res))
app.post('/DeleteAccount',(req,res)=>usercontroller.PostDeleteUser(req,res));
app.post('/createpost',)
app.listen(80, () =>
  console.log('Example app listening on port 80!'),
);