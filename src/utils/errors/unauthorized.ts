import { CustomError } from "./customError";

export class UnauthorizedError extends CustomError {
    statusCode: number = 401;

    constructor (message = 'Not Authorized') {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}