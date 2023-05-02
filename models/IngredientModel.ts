import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IIngredientModel} from '../interfaces/IIngredientModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class IngredientModel {
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
                ingredientID: Mongoose.Schema.Types.ObjectId,
                name: String,
                description: String,
                unitSize: String,
                quanitity: Number
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IIngredientModel>("ingredient", this.schema);
    }
}

export{IngredientModel}