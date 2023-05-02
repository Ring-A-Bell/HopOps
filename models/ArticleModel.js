"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongooseConnection = yield mongooseObj;
}))();
class ArticleModel {
    constructor() {
        // Due to a quirk of typescript, the schema has to be manually defined both here and in IArticleModel.ts
        this.createSchema = () => {
            this.schema = new Mongoose.Schema({
                articleID: Mongoose.Schema.Types.ObjectId,
                title: String,
                ownerID: Mongoose.Schema.Types.ObjectId,
                date: Date,
                body: String,
                parentArticle: Mongoose.Schema.Types.ObjectId
            }, { collection: 'article' });
        };
        this.createModel = () => {
            this.model = mongooseConnection.model("article", this.schema);
        };
        this.createSchema();
        this.createModel();
    }
    /*
    Custom methods below
    */
    retrieveAllArticles(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find();
            // const queryResult = await query.exec();
            // if(queryResult) {
            //     console.log("Data has been collected ->");
            //     console.log(queryResult);
            //     response.json(queryResult);
            // } else {
            //     response.send('Article model not initialized');
            // }
            query.then((res) => {
                response.json(res);
            }).catch((err) => {
                console.log("Error in retrieveAllArticles: " + err);
                response.json(err);
            });
        });
    }
    retrieveUserArticles(response, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({ ownerID: userID });
            const queryResult = yield query.exec();
            if (queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            }
            else {
                response.send('Article model not initialized');
            }
        });
    }
    retrieveArticle(response, post) {
        return __awaiter(this, void 0, void 0, function* () {
            var postID = new Mongoose.Types.ObjectId(post);
            var query = this.model.find({ articleID: postID });
            const queryResult = yield query.exec();
            if (queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            }
            else {
                response.send('Article model not initialized');
            }
        });
    }
    retrieveReplies(response, post) {
        return __awaiter(this, void 0, void 0, function* () {
            var postID = new Mongoose.Types.ObjectId(post);
            var query = this.model.find({ 'parentArticle': postID });
            const queryResult = yield query.exec();
            if (queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            }
            else {
                response.send('Article model not initialized');
            }
        });
    }
}
exports.ArticleModel = ArticleModel;
console.log('ArticleModel module loaded');
