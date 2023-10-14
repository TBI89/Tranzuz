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
        required: [true, "Please enter your first name."],
        minlength: [2, "First name has to contain at least 2 characters."],
        maxlength: [30, "First name can't contain more then 30 characters."]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name."],
        minlength: [2, "Last name has to contain at least 2 characters."],
        maxlength: [30, "Last name can't contain more then 30 characters."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [8, "Password has to contain at least 8 characters."]
        // Add custom validation for strong password.    
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        // Add custom validation for the email format & uniqueness.
    }
}, {
    versionKey: false
});

// 3. Model:
export const UserModel =  model<IUserModel>("UserModel", UserSchema, "users");