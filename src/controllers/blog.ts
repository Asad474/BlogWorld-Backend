import { NextFunction, Response } from "express";
import { ExtendRequest } from "../interfaces";
import { Blog } from "../models";
import { BadRequestError } from "../utils";

export const GetBlogs = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { search } = req.query;
        const blogs = await Blog.find(
            search ? {
                $or: [
                    { title: { $regex: search } },
                    { category: { $regex: search } },
                    { content: { $regex: search } },
                ]
            } : {}
        ).lean();

        return res.status(200).send(blogs);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const GetBlogById = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const blog = await Blog.findById(_id).lean();

        if (!blog){
            throw new BadRequestError('Blog does not exist with the given id.');
        }

        return res.status(200).send(blog);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const CreateBlog = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { title, category, content } = req.body;

        const blog = await Blog.create({
            user: req.user?._id,
            title,
            category,
            content,
        });

        return res.status(201).send(blog);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const UpdateBlog = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const { title, category, content } = req.body;

        const obj = await Blog.findOneAndUpdate(
            { blog: _id, user: req.user?._id },
            {
                $set: {
                    title,
                    category,
                    content,
                }
            }
        );

        if (!obj){
            throw new BadRequestError('Invalid Blog or User id.');
        }

        return res.status(200).send('Updated');
    } catch (error) {
        console.log(error);
        next(error);
    }   
}

export const DeleteBlog = async(req: ExtendRequest, res: Response, next: NextFunction) => {
    try {
        const { _id } = req.params;
        const obj = await Blog.findOneAndDelete({ blog: _id, user: req.user?._id });

        if (!obj){
            throw new BadRequestError('Invalid Blog or User id.');
        }

        return res.status(200).send('Deleted');
    } catch (error) {
        console.log(error);
        next(error);        
    }
}