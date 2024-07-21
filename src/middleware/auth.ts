import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models";
import { UnauthorizedError } from "../utils";
import { ExtendRequest } from "../interfaces";

export const protect = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.jwt_token;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;
                const user = await User.findById(decoded._id).select('-password').lean();

                if (!user){
                    throw new UnauthorizedError('User does not exists.');
                }

                req.user = user;
                next();
            } catch (error) {
                throw new UnauthorizedError('Unauthorized, invalid token');
            }
        } else{
            throw new UnauthorizedError('Unauthorized, no token');
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}