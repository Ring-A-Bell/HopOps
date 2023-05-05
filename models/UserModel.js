"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var Mongoose = require("mongoose");
var DataAccess_1 = require("./../DataAccess");
var nanoid_1 = require("nanoid");
var mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
var mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
var UserModel = /** @class */ (function () {
    function UserModel() {
        this.createSchema;
        this.createModel;
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IUserModel.ts
    UserModel.prototype.createSchema = function () {
        this.schema = new Mongoose.Schema({
            userID: {
                type: String,
                default: function () { return (0, nanoid_1.nanoid)(); }
            },
            name: String,
            email: String,
            premiumStatus: String
        });
    };
    UserModel.prototype.createModel = function () {
        this.model = mongooseConnection.model("user", this.schema);
    };
    return UserModel;
}());
exports.UserModel = UserModel;
