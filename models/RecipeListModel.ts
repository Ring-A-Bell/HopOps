import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IRecipeListModel} from '../interfaces/IRecipeListModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeListModel {
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
                recipeListID: Mongoose.Schema.Types.ObjectId,
                ownerID: Mongoose.Schema.Types.ObjectId,
                recipes: [Mongoose.Schema.Types.ObjectId]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeListModel>("recipeList", this.schema);
    }
}

export{RecipeListModel}