import * as Mongoose from 'mongoose';

interface IBreweryModel extends Mongoose.Document {
    breweryID: Mongoose.ObjectId;
    userID: Mongoose.ObjectId;
    name: String;
    address: String;
    phoneNumber: Number;
}

export {IBreweryModel};