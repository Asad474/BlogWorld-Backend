import { CustomError } from "./customError";

export class CloudinaryError extends CustomError {
    statusCode: number = 500;

    constructor (message = 'File does not uploaded to cloudinary') {
        super(message);
        Object.setPrototypeOf(this, CloudinaryError.prototype);
    }

    formatErrors(){
        return {
            message: this.message
        }                
    }
}