import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { generateToken, BadRequestError } from "../utils";

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email }).lean();

        if (user) {
            throw new BadRequestError('User already exists with this email id.');
        }

        const obj = await User.create({
            username,
            email,
            password,
        });

        return res.status(201).json({
            _id: obj._id,
            username: obj.username,
            email: obj.email,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !await user.matchPassword(password)){
            throw new BadRequestError('Email or Password is incorrect.');
        }

        generateToken(res, JSON.stringify(user._id));

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const Logout = async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt_token', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    return res.status(200).send('User logged out successfully');
}