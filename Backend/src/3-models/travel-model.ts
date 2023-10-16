import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ITravelModel extends Document {
    travelCode: number;
}

// 2. Schema:
export const TravelSchema = new Schema<ITravelModel>({
    travelCode: {
        type: Number,
        required: [true, "יש לבחור קוד נסיעה."]
    }
}, {
    versionKey: false
});

// 3. Model:
export const TravelModel = model<ITravelModel>("TravelModel", TravelSchema, "travels");