import * as Mongoose from 'mongoose';

interface IRecipeListModel extends Mongoose.Document {
    recipeListID: Mongoose.ObjectId;
    ownerID: Mongoose.ObjectId;
    recipes: Mongoose.ObjectId[];
}

export {IRecipeListModel}