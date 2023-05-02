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
exports.GatheringModel = void 0;
const Mongoose = require("mongoose");
const DataAccess_1 = require("../DataAccess");
let mongooseConnection = DataAccess_1.DataAccess.mongooseConnection;
let mongooseObj = DataAccess_1.DataAccess.mongooseInstance;
(() => __awaiter(void 0, void 0, void 0, function* () {
    mongooseConnection = yield mongooseObj;
}))();
class GatheringModel {
    constructor() {
        // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
        this.createSchema = () => {
            this.schema = new Mongoose.Schema({
                gatheringID: Mongoose.Schema.Types.ObjectId,
                articleID: Mongoose.Schema.Types.ObjectId,
                time: Date,
                rsvps: [Mongoose.Schema.Types.ObjectId]
            }, { collection: 'gatherings' });
        };
        this.createModel = () => {
            this.model = mongooseConnection.model("Gatherings", this.schema);
        };
        this.createSchema();
        this.createModel();
    }
    retrieveAllGatherings(response) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.find({});
            const queryResult = yield query.exec();
            if (queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            }
            else {
                console.log("No data found");
            }
        });
    }
    retrieveGatheringRSVPs(response, gathering) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = this.model.findOne({ gatheringID: gathering }).select('rsvps');
            const queryResult = yield query.exec();
            if (queryResult) {
                console.log("Data has been collected ->");
                console.log(queryResult);
                response.json(queryResult);
            }
            else {
                console.log("No data found");
            }
        });
    }
}
exports.GatheringModel = GatheringModel;
