"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreweryModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongooseConnection = yield mongooseObj;
}))();
class BreweryModel {
    constructor() {
        this.createSchema();
        this.createModel();
    }
    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    createSchema() {
        this.schema = new Mongoose.Schema({
            breweryID: Mongoose.Schema.Types.ObjectId,
            userID: Number,
            name: String,
            address: String,
            phoneNumber: Number
        }, { collection: 'brewery' });
    }
    createModel() {
        this.model = mongooseConnection.model("brewery", this.schema);
    }
    retrieveAllBreweries(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find();
            const queryResults = yield query.exec();
            if (queryResults) {
                response.json(queryResults);
            }
            else {
                response.send("Error Bro");
            }
        });
    }
    retrieveBrewery(response, arg_breweryID) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ breweryID: new Mongoose.Types.ObjectId(arg_breweryID) });
            try {
                const queryResult = yield query.exec();
                if (queryResult) {
                    response.json(queryResult);
                }
                else {
                    response.send("No data found");
                }
            }
            catch (err) {
                response.send("Error in retrieveBrewery: " + err);
            }
        });
    }
    updateBrewery(response, newBreweryDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.replaceOne({ breweryID: newBreweryDetails.breweryID }, newBreweryDetails);
            const queryResult = yield query.exec();
            if (queryResult.modifiedCount) {
                response.json(queryResult);
            }
            else {
                console.log(queryResult);
                response.send("something went wrong");
            }
        });
    }
    deleteBrewery(response, arg_breweryID) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.deleteOne({ breweryID: new Mongoose.Types.ObjectId(arg_breweryID) });
            const queryResult = yield query.exec();
            if (queryResult.deletedCount == 1) {
                response.json(queryResult);
            }
            else {
                response.send("something went wrong");
            }
        });
    }
}
exports.BreweryModel = BreweryModel;
