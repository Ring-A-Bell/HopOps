import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IRecipeModel} from '../interfaces/IRecipeModel';
import { nanoid } from 'nanoid';

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
                recipeID: {
                    type: String,
                    default: () => nanoid()
                },
                title: String,
                description: String,
                image: String,
                body: String,
                recipe: [{ingredient: String, quantity: Number}],
                favorite: Boolean
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeModel>("recipe", this.schema);
    }
}

export{RecipeModel}