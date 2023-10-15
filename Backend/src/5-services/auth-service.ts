import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/client-errors";
import { ICredentialsModel } from "../3-models/credentials-model";
import { IUserModel, UserModel } from "../3-models/user-model";

// Add a new user to database:
async function register(user: IUserModel): Promise<string> {
    user.validate(); // Validate user props.
    if (await checkIfEmailTaken(user.email)) throw new ValidationError(`The email ${user.email} already exist \n Please provide a different one.`);
    user.password = cyber.hashedPassword(user.password); // Hash + salt the new user's password.
    const registeredUser = await UserModel.create(user); // Create and generate _id for the new user.
    const token = cyber.getNewToken(registeredUser); // Generate JWT for the user.
    return token; // Return JWT.
}

// Login for registered users:
async function login(credentials: ICredentialsModel): Promise<string> {
    credentials.validate(); // Validate email & password.
    credentials.password = cyber.hashedPassword(credentials.password); // Hash the entered password. 
    const user = await UserModel.findOne({ email: credentials.email, password: credentials.password });
    if (!user) {
        throw new UnauthorizedError("Email or password are wrong"); // If user doesn't exist or passwords don't match: throw 401.
    }
    const token = cyber.getNewToken(user); // Generate token for the user.
    return token;
}

// Function to ensure the the users emails are unique:
async function checkIfEmailTaken(email: string): Promise<boolean> {
   const doesUserExist: IUserModel | null = await UserModel.findOne({email: email});
   return !!doesUserExist; // Change truthy to boolean.
}

export default {
    register,
    login,
    checkIfEmailTaken
};

