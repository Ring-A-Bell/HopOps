import * as Mongoose from 'mongoose';

interface IUserModel extends Mongoose.Document {
    userID: Mongoose.ObjectId;
    name: string;
    email: string;
    premiumStatus: String;
}

export {IUserModel}