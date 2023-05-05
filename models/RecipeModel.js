"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("../DataAccess");
var nanoid_1 = require("nanoid");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var RecipeModel = /** @class */ (function () {
    function RecipeModel() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IRecipeModel.ts
    RecipeModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            recipeID: {
                type: String,
                default: function () { return (0, nanoid_1.nanoid)(); }
            },
            title: String,
            description: String,
            image: String,
            body: String,
            recipe: [{ ingredient: String, quantity: Number }],
            favorite: Boolean
        });
    };
    RecipeModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("recipe", this.schema);
    };
    return RecipeModel;
}());
exports.RecipeModel = RecipeModel;
