import { Request, Response, NextFunction } from "express";
import logger from "../2-utils/logger";

// Get & log user activity (on the console & to activities.logs):
function verbose(request: Request, response: Response, next: NextFunction) {

    const userActivities =
        `
    User IP: ${request.ip}
    Method: ${request.method}
    URL: ${request.originalUrl}
    Body: ${JSON.stringify(request.body)}
    `

    logger.logActivity(userActivities);

    next();
}

export default verbose;