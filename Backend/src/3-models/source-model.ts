import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ISourceModel extends Document {
    sourceName: string;
}

// 2. Schema:
export const SourceSchema = new Schema<ISourceModel>({
    sourceName: {
        type: String,
        required: [true, "Please enter the source name."]
    }
},{
    versionKey: false
});

// 3. Model:
export const SourceModel = model<ISourceModel>("SourceModel", SourceSchema, "sources");