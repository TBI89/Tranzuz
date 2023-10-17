import {Document, Schema, model} from "mongoose";

// 1. Interface:
export interface ICredentialsModel extends Document {
    email: string;
    password: string;
}

// 2. Schema:
export const CredentialsSchema = new Schema<ICredentialsModel>({
    email: {
        type: String,
        required: [true, "יש להזין את כתובת המייל."]
    },
    password: {
        type: String,
        required: [true, "יש להזין סיסמא."]
        // Add custom validation.
    }
},{
    versionKey: false
});

// 3. Model:                                                                            * or a new collection: "credentials?"
export const CredentialsModel = model<ICredentialsModel>("CredentialsModel", CredentialsSchema, "users");