import { Document, Schema, model } from "mongoose";

// 1. Interface:
export interface IUserModel extends Document {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

// 2. Schema:
export const UserSchema = new Schema<IUserModel>({
    firstName: {
        type: String,
        required: [true, "יש להזין שם פרטי"],
        minlength: [2, "שם פרטי חייב להכיל לפחות 2 תווים."],
        maxlength: [30, "שם פרטי יכול להכיל 30 תווים לכל היותר."]
    },
    lastName: {
        type: String,
        required: [true, "יש להזין שם משפחה."],
        minlength: [2, "שם משפחה חייב להכיל לפחות 2 תווים."],
        maxlength: [30, "שם משפחה יכול להכיל 30 תווים לכל היותר."]
    },
    password: {
        type: String,
        required: [true, "יש להזין סיסמא."],
        minlength: [8, "הסיסמא חייבת להכיל לפחות 8 תווים."]
        // Add custom validation for strong password.    
    },
    email: {
        type: String,
        required: [true, "יש להזין את כתובת המייל."],
        // Add custom validation for the email format & uniqueness.
    }
}, {
    versionKey: false
});

// 3. Model:
export const UserModel =  model<IUserModel>("UserModel", UserSchema, "users");