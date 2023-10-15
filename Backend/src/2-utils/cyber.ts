import JWT from "jsonwebtoken";
import crypto from "crypto";
import { IUserModel } from "../3-models/user-model";
import { UnauthorizedError } from "../3-models/client-errors";
import { create } from "domain";

// Secret key:
const tokenSecretKey = "TomerAndTranzuzCollaboration";

// On register or login - generate JWT:
function getNewToken(user: IUserModel): string {
    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = JWT.sign(container, tokenSecretKey, options);
    return token;
}

// Check if the token exist & valid:
function verifyToken(token: string): void {
    if (!token) throw new UnauthorizedError("אנא התחבר כדי לצפות בדף זה");
    try {
        JWT.verify(token, tokenSecretKey);
    }
    catch (err: any) {
        throw new UnauthorizedError(err.message);
    }
}

// Add the following sting to the password for security reasons:
const hashSalt = "TransportationProject2023";

// Function to apply the hash and salt password operation:
function hashedPassword(plainText: string): string {
    if(!plainText) return null;
    const saltedHashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex");
    return saltedHashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    hashedPassword
};
