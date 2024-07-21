export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor (message: string) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype); //Makes sure the new error object has all the methods and properties (concrete and abstract methods) that belong to CustomError.
    }

    abstract formatErrors(): {
        message: string,
    }
}