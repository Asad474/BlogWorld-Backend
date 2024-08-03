import { Types } from "mongoose";

export interface IComment {
    user: Types.ObjectId,
    blog: Types.ObjectId,
    comment: string,
}