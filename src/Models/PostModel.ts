export class Post{
    readonly id :number|null
    readonly userid: number;
    readonly title :string;
    readonly content :string
    constructor (id :number|null, userid: number, title :string,content :string){
        this.id = id
        this.userid = userid;
        this.title = title;
        this.content = content;
    }
}