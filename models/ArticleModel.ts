import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IArticleModel } from '../interfaces/IArticleModel';
import { nanoid } from 'nanoid';


let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
  })();

class ArticleModel {
    public schema: Mongoose.Schema;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IArticleModel.ts
    public createSchema = (): void => {
        this.schema = new Mongoose.Schema(
            {
                articleID: {
                    type: String,
                    default: () => nanoid()
                },
                title: String,
                ownerID: String,
                date: Date,
                body: String,
                parentArticle: String
            }, { collection: 'article'}
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IArticleModel>("article", this.schema);
    }

    /* 
    Custom methods below 
    */

    public async createArticle(response: any, articleDetails: any): Promise<void> {
        var id = nanoid();
        articleDetails.articleID = id;
        Object.assign(articleDetails, {"articleID": id});
        this.model.create([articleDetails]);
    }

    public async getNumArticles(response:any): Promise<any> {
        var query = this.model.count();
        const queryResult = await query.exec();
        console.log("Count is " , queryResult);
        response.json(queryResult);
    }


    public async retrieveAllArticles(response:any): Promise<any> {
        var query = this.model.find();
        query.then((res: any) => {
            response.json(res);
        }).catch((err: Error) => {
            console.log("Error in retrieveAllArticles: " + err);
            response.json(err)
        })
    }

    public async retrieveUserArticles(response:any, userID: Number): Promise<any> {
        var query = this.model.find({ownerID: userID});
        const queryResult = await query.exec();
        if(queryResult) {
            console.log("Data has been collected ->");
            console.log(queryResult);
            response.json(queryResult);
        } else {
            response.send('Article model not initialized');
        }
    }

    public async retrieveArticle(response:any, postID: string): Promise<any> {
        var query = this.model.find({articleID: postID});
        const queryResult = await query.exec();
        if(queryResult) {
            console.log("Data has been collected ->");
            console.log(queryResult);
            response.json(queryResult);
        } else {
            response.send('Article model not initialized');
        }
    }

    public async retrieveReplies(response:any, postID: string): Promise<any> {
        var query = this.model.find({'parentArticle': postID});
        const queryResult = await query.exec();
        if(queryResult) {
            console.log("Data has been collected ->");
            console.log(queryResult);
            response.json(queryResult);
        } else {
            response.send('Article model not initialized');
        }
    }

    public async deleteArticle(response:any, postID: string): Promise<any> {
        var query = this.model.deleteOne({'articleID': postID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                response.json(queryResult);
            } else {
                response.send("No data found");
            }
        } catch (error) {
            console.log("Error in deleteArticle: " + error);
            response.json(error);
        }
    }
}

console.log('ArticleModel module loaded');
export{ArticleModel}