import { IComment } from "../interfaces";
import { model, Schema } from "mongoose";

const CommentSchema = new Schema <IComment> (
    {
        user: {
            type: String,
            ref: "User",
            required: true,
        },

        blog: {
            type: String,
            ref: "Blog",
            required: true,
        },

        comment: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true,
    }
)

export const Comment = model('Comment', CommentSchema);