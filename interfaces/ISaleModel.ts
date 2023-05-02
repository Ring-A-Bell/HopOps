import * as Mongoose from 'mongoose';

interface ISaleModel extends Mongoose.Document {
    saleID: Mongoose.ObjectId;
    date: Date;
    paymentMethod: string;
    soldItems: Mongoose.ObjectId[];
}

export {ISaleModel}