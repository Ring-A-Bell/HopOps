import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IRecipeModel} from '../interfaces/IRecipeModel';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class RecipeModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema;
        this.createModel;
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IRecipeModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                recipeID: Mongoose.Schema.Types.ObjectId,
                title: String,
                description: String,
                image: String,
                body: String,
                recipe: [{ingredient: Mongoose.Schema.Types.ObjectId, quantity: Number}],
                favorite: Boolean
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeModel>("recipe", this.schema);
    }
}

export{RecipeModel}