import { CustomError } from "./customError";

export class FileUploaderError extends CustomError {
    statusCode: number = 400;

    constructor (message = 'Error occurred while uploading file') {
        super(message);
        Object.setPrototypeOf(this, FileUploaderError.prototype);
    }

    formatErrors() {
        return {
            message: this.message
        }
    }
}