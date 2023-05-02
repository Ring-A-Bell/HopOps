import * as Mongoose from 'mongoose';

interface IRecipeModel extends Mongoose.Document {
    recipeID: Mongoose.ObjectId;
    title: String;
    description: String;
    image?: String;
    body: String;
    recipe: [{ingredient: Mongoose.ObjectId, quantity: Number}];
    favorite: Boolean;
}

export {IRecipeModel}