import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { UnauthorizedError } from "../utils";
import { ExtendRequest } from "../interfaces";

const jwtVerify = (token: string, secret: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) 
                return reject(err);
            
            resolve(decoded);
        });
    });
}

export const protect = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.jwt_token;

        if (!token) {
            throw new UnauthorizedError('Unauthorized, no token');
        }
        
        try {
            const decoded = await jwtVerify(token, process.env.JWT_TOKEN as string);
            const user = await User.findById(decoded._id).select('-password').lean();

            if (!user){
                throw new UnauthorizedError('User does not exists.');
            }

            req.user = user;
            next();
        } catch (error) {
            throw new UnauthorizedError('Unauthorized, invalid token');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}