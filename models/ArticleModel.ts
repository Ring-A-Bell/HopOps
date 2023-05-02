import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IArticleModel } from '../interfaces/IArticleModel';


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
                articleID: Mongoose.Schema.Types.ObjectId, // should this be objectID????
                title: String,
                ownerID: Mongoose.Schema.Types.ObjectId,
                date: Date,
                body: String,
                parentArticle: Mongoose.Schema.Types.ObjectId
            }, { collection: 'article'}
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IArticleModel>("article", this.schema);
    }

    /* 
    Custom methods below 
    */

    public async retrieveAllArticles(response:any): Promise<any> {
        var query = this.model.find();
        // const queryResult = await query.exec();
        // if(queryResult) {
        //     console.log("Data has been collected ->");
        //     console.log(queryResult);
        //     response.json(queryResult);
        // } else {
        //     response.send('Article model not initialized');
        // }
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

    public async retrieveArticle(response:any, post: string): Promise<any> {
        var postID = new Mongoose.Types.ObjectId(post);
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

    public async retrieveReplies(response:any, post: string): Promise<any> {
        var postID = new Mongoose.Types.ObjectId(post);
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
}

console.log('ArticleModel module loaded');
export{ArticleModel}