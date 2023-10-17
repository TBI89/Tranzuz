import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ITripModel extends Document {
    tripId: number;
}

// 2. Schema:
export const TripSchema = new Schema<ITripModel>({
    tripId: {
        type: Number,
        required: [true, "יש לבחור קוד נסיעה."]
    }
}, {
    versionKey: false
});

// 3. Model:
export const TripModel = model<ITripModel>("TripModel", TripSchema, "trips");