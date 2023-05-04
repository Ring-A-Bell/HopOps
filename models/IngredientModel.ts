import mongoose, * as Mongoose from 'mongoose';
import {DataAccess} from '../DataAccess';
import {IIngredientModel} from '../interfaces/IIngredientModel';
import {nanoid} from 'nanoid';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

(async () => {
    mongooseConnection = await mongooseObj;
})();

class IngredientModel {
    public schema: Mongoose.Schema;
    public model: any;

    public constructor() {
        this.createSchema();
        this.createModel();
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IGatheringModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                ingredientID: {
                    type: String,
                    default: () => nanoid()
                },
                name: String,
                description: String,
                unitSize: String,
                quantity: Number
            }, { collection: 'ingredient'}
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IIngredientModel>("ingredient", this.schema);
    }

    public async retrieveAllIngredients(response: any): Promise<void> {
        var query = this.model.find();
        const queryResults = await query.exec();
        console.log(queryResults);
        if(queryResults) {
            response.json(queryResults);
        } else {
            response.send("Error retrieving ingredients");
        }
    }

    public async retrieveIngredient(response: any, arg_ingredientID: string): Promise<void> {
        var query = this.model.findOne({ingredientID: arg_ingredientID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                response.json(queryResult);
            } else {
                response.send("No data found");
            }
        } catch(err) {
            response.send("Error in retrieveIngredient: " + err);
        }
    }

    public async deleteIngredient(response: any, arg_ingredientID: string): Promise<void> {
        var query = this.model.deleteOne({ingredientID: arg_ingredientID});
        try {
            const queryResult = await query.exec();
            if(queryResult) {
                response.json(queryResult);
            } else {
                response.send("No data found");
            }
        } catch(err) {
            response.send("Error in deleteIngredient: " + err);
        }
    }

    public async updateIngredientQuantity(response: any, arg_ingredientID: string, newQty: number): Promise<void> {
        var query = this.model.findOneAndUpdate({ingredientID: arg_ingredientID}, {quantity: newQty});
        try {
            const queryResult = await query.exec();
            query = await this.model.findOne({ingredientID: arg_ingredientID}).exec();
            if(queryResult) {
                response.json(query);
            } else {
                response.send("No data found");
            }
        } catch(err) {
            response.send("Error in updateIngredient: " + err);
        }
    }
}

export{IngredientModel}