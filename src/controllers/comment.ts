import { NextFunction, Response } from "express";
import { ExtendRequest } from "../interfaces";
import { Blog, Comment } from "../models";
import { BadRequestError } from "../utils";

export const getComments = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;

        if (!await Blog.findById(_id)){
            throw new BadRequestError('Blog does not exist with the given id.')
        }

        const comments = await Comment.find({ blog: _id });
        return res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        next(error);        
    }
}

export const createComment = async(req: ExtendRequest, res: Response, next: NextFunction) => {
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

export const updateComment = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const { comment } = req.body;

        const obj = await Comment.findByIdAndUpdate(
            _id,
            {
                $set: { comment }
            }
        );

        if (!obj){
            throw new BadRequestError('Comment does not exists.');
        }

        return res.status(200).send('Updated');
    } catch (error) {
        console.log(error);
        next(error);        
    }
}

export const deleteComment = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const obj = await Comment.findByIdAndDelete(_id);

        if (!obj){
            throw new BadRequestError('Comment does not exists.');
        }

        return res.status(200).send('Deleted');
    } catch (error) {
        console.log(error);
        next(error);        
    }
}