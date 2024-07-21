import { CustomError } from "./customError";

export class BadRequestError extends CustomError {
    statusCode: number = 400;

    constructor (message = 'Bad Request') {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    formatErrors() {  
        return {
            message: this.message
        }
    }
}