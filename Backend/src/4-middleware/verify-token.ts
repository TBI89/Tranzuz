import { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";

// Add headers to the request extract the token and verify it:
function verifyToken(request: Request, response: Response, next: NextFunction) {
    const authHeaders = request.header("authorization");
    const token = authHeaders?.substring(7); // (from "Bearer " it's 7 chars to the token itself).
    cyber.verifyToken(token);
    next();
}

export default verifyToken;