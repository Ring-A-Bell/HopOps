import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {ISoldItem} from '../interfaces/ISoldItemModel';


let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class SoldItemModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema;
        this.createModel;
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IArticleModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                soldItemID: String,
                quantitySold: Number,
                pricePerUnit: Number
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<ISoldItem>("soldItem", this.schema);
    }

    /* 
    Custom methods below 
    */
}

export{SoldItemModel}