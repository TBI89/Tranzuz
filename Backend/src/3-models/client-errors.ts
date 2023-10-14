import StatusCode from "./status-code";

// Base client error:
abstract class ClientError {
    constructor(public status: number, public message: string) { }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.BadRequest, message);
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(StatusCode.Unauthorized, message);
    }
}

export class RouteNotFoundError extends ClientError {
    public constructor(route: string) {
        super(StatusCode.NotFound, `Route ${route} not found.`);
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(_id: string) {
        super(StatusCode.NotFound, `_id ${_id} doesn't exist.`);
    }
}
