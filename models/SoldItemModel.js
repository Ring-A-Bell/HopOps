"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldItemModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class SoldItemModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IArticleModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            soldItemID: Mongoose.Schema.Types.ObjectId,
            quantitySold: Number,
            pricePerUnit: Number
        });
    }
    createModel() {
        this.model = mongooseConnection.model("soldItem", this.schema);
    }
}
exports.SoldItemModel = SoldItemModel;
