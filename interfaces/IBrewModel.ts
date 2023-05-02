import * as Mongoose from 'mongoose';

interface IBrewModel extends Mongoose.Document {
    brewID: Mongoose.ObjectId;
    recipe: Mongoose.ObjectId;
    startDate: Date;
    endDate: Date;
    batchSize: Number;
    status: String;
}

export {IBrewModel}