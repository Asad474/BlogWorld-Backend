import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, _id: string) => {
    const token = jwt.sign({ _id: JSON.parse(_id) }, process.env.JWT_TOKEN as string, {
        expiresIn: '10d'
    });

    res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });
};