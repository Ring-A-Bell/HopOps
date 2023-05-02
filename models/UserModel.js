"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("./../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
class UserModel {
    constructor() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IUserModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            userID: { type: Mongoose.Schema.Types.ObjectId, required: true },
            name: String,
            email: String,
            premiumStatus: String
        });
    }
    createModel() {
        this.model = mongooseConnection.model("user", this.schema);
    }
}
exports.UserModel = UserModel;
