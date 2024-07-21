import { Request, Response, NextFunction } from 'express';
import { CustomError, NotFoundError } from '../utils';

export const NotFoundHandler = (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    next(new NotFoundError());
}

export const ErrorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.formatErrors() });
    }

    console.log(err);
    return res.status(500).send('Internal Server Error');
}