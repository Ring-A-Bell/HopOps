import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IBreweryModel} from '../interfaces/IBreweryModel';
import {nanoid} from 'nanoid';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})();

class BreweryModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                breweryID: {
                    type: String,
                    default: () => nanoid()
                },
                userID: Number,
                name: String,
                address: String,
                phoneNumber: Number
            }, {collection: 'brewery'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IBreweryModel>("brewery", this.schema);
    }

    public async createBrewery(response: any, breweryDetails: any): Promise<void> {
        var id = nanoid();
        breweryDetails.breweryID = id;
        this.model.create([breweryDetails]);
    }

    public async retrieveAllBreweries(response: any): Promise<void> {
        var query = this.model.find();
        const queryResults = await query.exec();

        if(queryResults) {
            response.json(queryResults);
        } else {
            response.send("Error Bro");
        }
    }

    public async retrieveBrewery(response: any, arg_breweryID: string): Promise<void> {
        var query = this.model.findOne({breweryID: arg_breweryID});

        try {
            const queryResult = await query.exec();
            if(queryResult) {
                response.json(queryResult);
            } else {
                response.send("No data found");
            }
        } catch(err) {
            response.send("Error in retrieveBrewery: " + err);
        }
    }

    public async updateBrewery(response: any, arg_breweryID: string, newBreweryDetails: any): Promise<void> {
        var query = this.model.replaceOne({breweryID: arg_breweryID}, newBreweryDetails);
        const queryResult = await query.exec();
        if(queryResult.modifiedCount) {
            response.json(queryResult);
        } else {
            console.log(queryResult);
            response.send("something went wrong");
        }
    }

    public async deleteBrewery(response: any, arg_breweryID: string): Promise<void> {
        var query = this.model.deleteOne({breweryID: arg_breweryID});
        const queryResult = await query.exec();
        if(queryResult.deletedCount==1) {
            response.json(queryResult);
        } else {
            response.send("something went wrong");
        }
    }
}

export{BreweryModel}