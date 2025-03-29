import { ValidationError } from "express-validator";
import { CustomError } from "./customError";

export class RequestValidationError extends CustomError {
    statusCode: number = 400;

    constructor (public errors: ValidationError[]) {
        super('Validation Error');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    formatErrors() {
        return {
            message: this.errors[0].msg
        }
    }
}