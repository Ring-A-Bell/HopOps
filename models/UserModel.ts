import * as Mongoose from 'mongoose';
import {DataAccess} from './../DataAccess';
import {IUserModel} from '../interfaces/IUserModel';
import { nanoid } from 'nanoid';

let mongooseConnection = DataAccess.mongooseConnection;
let mongooseObj = DataAccess.mongooseInstance;

class UserModel {
    public schema: any;
    public model: any;

    public constructor() {
        this.createSchema;
        this.createModel;
    }

    // Due to a quirk of typescript, the schema has to be manually defined both here and in IUserModel.ts
    public createSchema(): void {
        this.schema = new Mongoose.Schema(
            {
                userID: {
                    type: String,
                    default: () => nanoid()
                },
                name: String,
                email: String,
                premiumStatus: String
            }
        );
    }

    public createModel(): void {
        this.model = mongooseConnection.model<IUserModel>("user", this.schema);
    }
}

export{UserModel}