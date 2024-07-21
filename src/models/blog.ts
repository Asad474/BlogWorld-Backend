import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces";

const BlogSchema = new Schema <IBlog> (
    {
        user: {
            type: String,
            ref: "User",
            required: true,
        }, 

        title: {
            type: String,
            required: true,
        },

        category: {
            type: String,
        }, 

        content: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true,
    }
)

export const Blog = model('Blog', BlogSchema);