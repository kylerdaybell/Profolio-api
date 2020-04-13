import { Post } from "../Models/PostModel";
import { IPostRepository } from "./IPostRepository";
const mysql2 = require("mysql2/promise");

export class MySqlPostRepository implements IPostRepository {
    public async getConnection() {
        const con = await mysql2.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,

        });
        return con;
    }
    public async CreatePost(post: Post): Promise<boolean> {
        const con = await this.getConnection();
        try {
            const [rows] = await con.execute("INSERT INTO POST (USERID,TITLE,CONTENT) VALUE (?,?,?)", [post.userid, post.title, post.content]);
            return Promise.resolve(true);
        } catch (error) {
            console.log(error);
            return Promise.resolve(false);
        } finally {
            con.end();
        }
    }

}
