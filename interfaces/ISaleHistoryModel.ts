import * as Mongoose from 'mongoose';

interface ISaleHistoryModel extends Mongoose.Document {
    saleHistoryID: Mongoose.ObjectId;
    ownerID: Mongoose.ObjectId;
    sales: Mongoose.ObjectId[];
}

export {ISaleHistoryModel}