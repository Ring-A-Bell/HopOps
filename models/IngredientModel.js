"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class IngredientModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            ingredientID: Mongoose.Schema.Types.ObjectId,
            name: String,
            description: String,
            unitSize: String,
            quanitity: Number
        });
    }
    createModel() {
        this.model = mongooseConnection.model("ingredient", this.schema);
    }
}
exports.IngredientModel = IngredientModel;
