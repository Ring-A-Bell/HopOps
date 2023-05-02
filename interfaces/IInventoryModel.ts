import * as Mongoose from 'mongoose';

interface IInventoryModel extends Mongoose.Document {
    inventoryID: Mongoose.ObjectId;
    ownerID: Mongoose.ObjectId;
    ingredients: Mongoose.ObjectId[];
}

export {IInventoryModel}