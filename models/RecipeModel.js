"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class RecipeModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IRecipeModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            recipeID: Mongoose.Schema.Types.ObjectId,
            title: String,
            description: String,
            image: String,
            body: String,
            recipe: [{ ingredient: Mongoose.Schema.Types.ObjectId, quantity: Number }],
            favorite: Boolean
        });
    }
    createModel() {
        this.model = mongooseConnection.model("recipe", this.schema);
    }
}
exports.RecipeModel = RecipeModel;
