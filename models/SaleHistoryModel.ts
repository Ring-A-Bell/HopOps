import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {ISaleHistoryModel} from '../interfaces/ISaleHistoryModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class SaleHistoryModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema;
        this.createModel;
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                saleHistoryID: { type: Mongoose.Schema.Types.ObjectId, required: true }, // should this be objectID????
                ownerID: Mongoose.Schema.Types.ObjectId,
                sales: [Mongoose.Schema.Types.ObjectId]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISaleHistoryModel>("saleHistory", this.schema);
    }

    public retrieveAllSales(response:any, salesHistory: Number): any {
        var query = this.model.find({parentArticle: salesHistory}).select('sales');
        query.exec( (err, itemArray) => {
            response.json(itemArray) ;
        });
    }
}

export{SaleHistoryModel}