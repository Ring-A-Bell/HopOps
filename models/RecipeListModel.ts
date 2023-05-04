import * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IRecipeListModel} from '../interfaces/IRecipeListModel';
import { nanoid } from 'nanoid';

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
                recipeListID: {
                    type: String,
                    default: () => nanoid()
                },
                ownerID: String,
                recipes: [String]
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IRecipeListModel>("recipeList", this.schema);
    }
}

export{RecipeListModel}