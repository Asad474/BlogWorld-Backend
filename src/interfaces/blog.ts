import { Types } from "mongoose";

export interface IBlog {
    user: Types.ObjectId,
    title: string,
    category: string,
    content: string,
}