import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../3-models/client-errors";

// Route not found:
function routeNotFound(request: Request, response: Response, next: NextFunction) {
    next(new RouteNotFoundError(request.originalUrl));
}

export default routeNotFound;
