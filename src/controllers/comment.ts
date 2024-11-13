import { NextFunction, Response, Request } from "express";
import { Blog, Comment } from "../models";
import { BadRequestError } from "../utils";

export const createComment = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { blog, comment } = req.body;

        if (!await Blog.findById(blog)){
            throw new BadRequestError('Blog does not exist with the given id.')
        }

        const obj = await Comment.create({
            user: req.user?._id,
            blog,
            comment
        });

        return res.status(201).send(obj);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const updateComment = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const { comment } = req.body;

        const obj = await Comment.findOneAndUpdate(
            { _id, user: req.user?._id },
            {
                $set: { comment }
            }
        );

        if (!obj){
            throw new BadRequestError('Invalid Comment or User id.');
        }

        return res.status(200).send('Updated');
    } catch (error) {
        console.log(error);
        next(error);        
    }
}

export const deleteComment = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const obj = await Comment.findOneAndDelete({ _id, user: req.user?._id });

        if (!obj){
            throw new BadRequestError('Invalid Comment or User id.');
        }

        return res.status(200).send('Deleted');
    } catch (error) {
        console.log(error);
        next(error);        
    }
}