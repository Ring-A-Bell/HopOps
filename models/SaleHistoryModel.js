"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleHistoryModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class SaleHistoryModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            saleHistoryID: { type: Mongoose.Schema.Types.ObjectId, required: true },
            ownerID: Mongoose.Schema.Types.ObjectId,
            sales: [Mongoose.Schema.Types.ObjectId]
        });
    }
    createModel() {
        this.model = mongooseConnection.model("saleHistory", this.schema);
    }
    retrieveAllSales(response, salesHistory) {
        var query = this.model.find({ parentArticle: salesHistory }).select('sales');
        query.exec((err, itemArray) => {
            response.json(itemArray);
        });
    }
}
exports.SaleHistoryModel = SaleHistoryModel;
