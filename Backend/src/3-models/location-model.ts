import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ILocationModel extends Document {
    startingPoint: string;
    destination: string;
}

// 2. Schema:
export const LocationSchema = new Schema<ILocationModel>({
    startingPoint: {
        type: String,
        required: [true, "יש להזין את נקודת המוצא."]
    },
    destination: {
        type: String,
        required: [true, "יש להזין יעד."]
    }

},{
    versionKey: false
});

// 3. Model:
export const LocationModel = model<ILocationModel>("LocationModel", LocationSchema, "locations");