const bcrypt = require('bcryptjs');

export class User{
    readonly id: number|null;
    readonly email :string;
    readonly password: string;
    readonly authorization: "none"|"user"|"admin"; 
    public constructor(id:number|null,email:string,password:string,authorization:"none"|"user"|"admin"){
        this.id = id
        this.email = email;
        this.password = password;
        this.authorization = authorization;
    }
    public HashPassword(): User{
        let hashpassword = bcrypt.hashSync(this.password)
        let passwordhasheduser = new User(null,this.email,hashpassword,this.authorization)
        return passwordhasheduser;
    }
    public ValidatePassword(password: string): boolean{
        return bcrypt.compareSync(password,this.password)
    }

}