import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ILocationModel extends Document {
    locationName: string;
}

// 2. Schema:
export const LocationSchema = new Schema<ILocationModel>({
    locationName: {
        type: String,
        required: [true, "יש להזין את שם המיקום."]
    }
},{
    versionKey: false
});

// 3. Model:
export const LocationModel = model<ILocationModel>("LocationModel", LocationSchema, "locations");