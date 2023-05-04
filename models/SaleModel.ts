import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {ISaleModel} from '../interfaces/ISaleModel';
import { nanoid } from 'nanoid';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class SaleModel {
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
                saleID: {
                    type: String,
                    default: () => nanoid()
                },
                date: Date,
                paymentMethod: String,
                soldItems: [String]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISaleModel>("sale", this.schema);
    }
}

export{SaleModel}