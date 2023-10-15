import { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import appConfig from "../2-utils/app-config";
import logger from "../2-utils/logger";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {

    // Take status code: 
    const status = err.status || StatusCode.InternalServerError;

    // Define server crash:
    const isCrash = status >= 500 && status <= 599;

    // Display err.message on dev mode / generic error on production:
    const message = isCrash && appConfig.isProduction ? "התרחשה שגיאה, יש לנסות שוב מאוחר יותר." : err.message;

    // Log on the console any error:
    console.log(err);

    // Add the error the errors.log file:
    logger.logError(err.message, err);

    // Send back error details to frontend:
    response.status(status).send(message);
}

export default catchAll;
