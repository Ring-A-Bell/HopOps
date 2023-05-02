import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IBrewModel} from '../interfaces/IBrewModel';
import { ObjectId } from 'mongodb';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
  mongooseConnection = await mongooseObj;
})();

class BrewModel {
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
                brewID: Mongoose.Schema.Types.ObjectId,
                recipe: Mongoose.Schema.Types.ObjectId,
                startDate: Date,
                endDate: Date,
                batchSize: Number,
                status: String
            }, { collection: 'brew'}
        );
    }

    public createModel = (): void => {
        this.model = mongooseConnection.model<IBrewModel>("brew", this.schema);
    }

    public async retrieveAllBrews(response:any): Promise<any> {
        var query = this.model.find();
        query.then((res: any) => {
          console.log("Data retrieved: " + res);
          response.json(res);
      }).catch((err: any) => {
          console.log("Error in retrieveAllArticles: " + err);
          response.json(err)
      })
    }

    public async retrieveBrew(response:any, brewID: string): Promise<any> {
      try {
        const queryResult = await this.model.findOne({brewID: new ObjectId(brewID)}).exec();
        if(queryResult) {
          console.log("Data has been collected ->");
          console.log(queryResult);
          response.json(queryResult);
        } else {
          console.log("No data found");
          response.sendStatus(404);
        }
      } catch(error) {
        console.log("Error while retrieving brew: ", error);
        response.sendStatus(500);
      }
    }

    public async updateBrewStatus(response: any, arg_brewID: string, newStatus: String): Promise<any> {
      var query = this.model.findOneAndUpdate({brewID: new ObjectId(arg_brewID)}, {status: newStatus});
      try {
        const queryResult = await query.exec();
        await queryResult.save();
        query = await this.model.findOne({brewID: arg_brewID}).exec()
        if(queryResult) {
          response.json(query);
        } else {
          console.log(query);
          response.send("Couldn't update status of brew");
        }
      } catch(error) {
        console.log("Error in updateBrewStatus: ", error);
        response.sendStatus(500);
      } 
    }
}

export{BrewModel}