import { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    // Display error: 
    console.log("Error: ", err);

    // Take status code: 
    const status = err.status || StatusCode.InternalServerError; 

    // Take message: 
    const message = err.message;

    // Send back error details to frontend:
    response.status(status).send(message);
}

export default catchAll;
