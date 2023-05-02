import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IInventoryModel} from '../interfaces/IInventoryModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class InventoryModel {
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
                inventoryID: Mongoose.Schema.Types.ObjectId,
                ownerID: Mongoose.Schema.Types.ObjectId,
                ingredients: [Mongoose.Schema.Types.ObjectId]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IInventoryModel>("inventory", this.schema);
    }
}

export{InventoryModel}