export class Post {
    public readonly id: number|null;
    public readonly userid: number;
    public readonly title: string;
    public readonly content: string;
    constructor(id: number|null, userid: number, title: string, content: string) {
        this.id = id;
        this.userid = userid;
        this.title = title;
        this.content = content;
    }
}
