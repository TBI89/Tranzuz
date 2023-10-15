import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ITravelModel extends Document {
    travelName: string;
}

// 2. Schema:
export const TravelSchema = new Schema<ITravelModel>({
    travelName: {
        type: String,
        required: [true, "יש לבחור שם נסיעה."]
    }
}, {
    versionKey: false
});

// 3. Model:
export const TravelModel = model<ITravelModel>("TravelModel", TravelSchema, "travels");