"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class SaleModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            saleID: Mongoose.Schema.Types.ObjectId,
            date: Date,
            paymentMethod: String,
            soldItems: [Mongoose.Schema.Types.ObjectId]
        });
    }
    createModel() {
        this.model = mongooseConnection.model("sale", this.schema);
    }
}
exports.SaleModel = SaleModel;
