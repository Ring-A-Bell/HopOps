import * as Mongoose from 'mongoose';

interface ISoldItem extends Mongoose.Document {
    soldItemID: Mongoose.ObjectId;
    quantitySold: number;
    pricePerUnit: number;
}

export {ISoldItem};