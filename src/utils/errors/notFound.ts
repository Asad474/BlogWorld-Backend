import { CustomError } from "./customError";

export class NotFoundError extends CustomError {
    statusCode: number = 400;

    constructor (message = 'Not Found') {
        super(message);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}