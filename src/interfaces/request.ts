import { Request } from "express";
import { IUser } from "./user";

export interface ExtendRequest extends Request {
    user?: IUser;
}