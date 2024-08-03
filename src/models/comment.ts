import { IComment } from "../interfaces";
import { model, Schema } from "mongoose";

const CommentSchema = new Schema <IComment> (
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        blog: {
            type: Schema.Types.ObjectId,
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