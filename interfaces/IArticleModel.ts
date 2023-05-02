import * as Mongoose from 'mongoose';

interface IArticleModel extends Mongoose.Document {
    articleID: Mongoose.ObjectId;
    title: string;
    ownerID: Mongoose.ObjectId;
    date: Date; 
    body: string;
    parentArticle?: Mongoose.ObjectId
}

export {IArticleModel};