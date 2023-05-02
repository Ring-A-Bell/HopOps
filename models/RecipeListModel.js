"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeListModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class RecipeListModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            recipeListID: Mongoose.Schema.Types.ObjectId,
            ownerID: Mongoose.Schema.Types.ObjectId,
            recipes: [Mongoose.Schema.Types.ObjectId]
        });
    }
    createModel() {
        this.model = mongooseConnection.model("recipeList", this.schema);
    }
}
exports.RecipeListModel = RecipeListModel;
