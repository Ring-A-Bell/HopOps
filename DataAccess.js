"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAccess = void 0;
const mongoose_1 = require("mongoose");
class DataAccess {
    constructor() {
        DataAccess.connect();
    }
    static connect() {
        if (this.mongooseInstance)
            return this.mongooseInstance;
        this.mongooseConnection = mongoose_1.default.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to mongodb.");
        });
        this.mongooseInstance = mongoose_1.default.connect(this.DB_CONNECTION_STRING);
        return this.mongooseInstance;
    }
}
exports.DataAccess = DataAccess;
DataAccess.DB_CONNECTION_STRING = 'mongodb://dbAdmin:test@127.0.0.1:27017/hopops?authMechanism=DEFAULT';
DataAccess.connect();
