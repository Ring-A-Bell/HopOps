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
exports.BrewModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
const mongodb_1 = require("mongodb");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongooseConnection = yield mongooseObj;
}))();
class BrewModel {
    constructor() {
        // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
        this.createSchema = () => {
            this.schema = new Mongoose.Schema({
                brewID: Mongoose.Schema.Types.ObjectId,
                recipe: Mongoose.Schema.Types.ObjectId,
                startDate: Date,
                endDate: Date,
                batchSize: Number,
                status: String
            }, { collection: 'brew' });
        };
        this.createModel = () => {
            this.model = mongooseConnection.model("brew", this.schema);
        };
        this.createSchema();
        this.createModel();
    }
    retrieveAllBrews(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find();
            query.then((res) => {
                console.log("Data retrieved: " + res);
                response.json(res);
            }).catch((err) => {
                console.log("Error in retrieveAllArticles: " + err);
                response.json(err);
            });
        });
    }
    retrieveBrew(response, brewID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryResult = yield this.model.findOne({ brewID: new mongodb_1.ObjectId(brewID) }).exec();
                if (queryResult) {
                    console.log("Data has been collected ->");
                    console.log(queryResult);
                    response.json(queryResult);
                }
                else {
                    console.log("No data found");
                    response.sendStatus(404);
                }
            }
            catch (error) {
                console.log("Error while retrieving brew: ", error);
                response.sendStatus(500);
            }
        });
    }
    updateBrewStatus(response, arg_brewID, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOneAndUpdate({ brewID: new mongodb_1.ObjectId(arg_brewID) }, { status: newStatus });
            try {
                const queryResult = yield query.exec();
                yield queryResult.save();
                query = yield this.model.findOne({ brewID: arg_brewID }).exec();
                if (queryResult) {
                    response.json(query);
                }
                else {
                    console.log(query);
                    response.send("Couldn't update status of brew");
                }
            }
            catch (error) {
                console.log("Error in updateBrewStatus: ", error);
                response.sendStatus(500);
            }
        });
    }
}
exports.BrewModel = BrewModel;
