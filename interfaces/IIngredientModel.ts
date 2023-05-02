import * as Mongoose from 'mongoose';

interface IIngredientModel extends Mongoose.Document {
    ingredientID: Mongoose.ObjectId;
    name: String;
    description: String;
    unitSize: String;
    quanitity: Number;
}

export {IIngredientModel}