import * as Mongoose from 'mongoose';

interface IGatheringModel extends Mongoose.Document {
    gatheringID: Mongoose.ObjectId;
    articleID: Mongoose.ObjectId,
    date: Date;
    rsvps: Mongoose.ObjectId[];
}

export {IGatheringModel}