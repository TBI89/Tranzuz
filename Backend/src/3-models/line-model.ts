import { Document, Schema, model } from "mongoose";

// 1. Interface:
export interface ILineModel extends Document {
    lineId: number;
    lineNumber: number;
    direction: number;
    alternative: string;
    description: string;
}

// 2. Schema:
export const LineSchema = new Schema<ILineModel>({
    lineId: {
        type: Number,
        required: [true, "יש להזין מקט קו."]
    },
    lineNumber: {
        type: Number,
        required: [true, "יש להזין מספר קו."]
    },
    direction: {
        type: Number,
        required: [true, "יש להזין את כיוון הקו."]
    },
    alternative: {
        type: String
    },
    description: {
        type: String,
        required: [true, "יש להזין את תיאור הקו."]
    }

}, {
    versionKey: false
});

// 3. Model:
export const LineModel = model<ILineModel>("LineModel", LineSchema, "lines");