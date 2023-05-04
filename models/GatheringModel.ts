import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IGatheringModel} from '../interfaces/IGatheringModel';
import {nanoid} from 'nanoid';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})();


class GatheringModel {
    public schema: Mongoose.Schema;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    public createSchema = (): void => {
        this.schema = new Mongoose.Schema(
            {
                gatheringID: {
                    type: String,
                    default: () => nanoid()
                },
                articleID: String,
                time: Date,
                rsvps: [String]
            }, { collection: 'gatherings'}
        );  
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IGatheringModel>("Gatherings", this.schema);
    }

    public async retrieveAllGatherings(response:any): Promise<any> {
        var query = this.model.find({});
        const queryResult = await query.exec();
        if(queryResult) {
            console.log("Data has been collected ->");
            console.log(queryResult);
            response.json(queryResult);
        } else {
            console.log("No data found");
        }
    }

    public async retrieveGatheringRSVPs(response:any, gathering: Number): Promise<any> {
        var query = this.model.findOne({gatheringID: gathering}).select('rsvps');
        const queryResult = await query.exec();
        if(queryResult) {
            console.log("Data has been collected ->");
            console.log(queryResult);
            response.json(queryResult);
        } else {
            console.log("No data found");
        }
    }
}

export{GatheringModel}