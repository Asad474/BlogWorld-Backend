import { Router } from "express";
import { 
    CreateBlog, 
    DeleteBlog, 
    GetBlogById, 
    GetBlogs, 
    UpdateBlog 
} from "../controllers";
import { protect, validateRequest } from "../middleware";
import { 
    createBlogValidator, 
    deleteBlogValidator, 
    getBlogByIdValidator, 
    updateBlogValidator 
} from "../utils";

export const blogRouter = Router();

blogRouter.route('/')
    .get(protect, GetBlogs)
    .post(protect, createBlogValidator, validateRequest, CreateBlog);    

blogRouter.route('/:_id')
    .get(protect, getBlogByIdValidator, validateRequest, GetBlogById)
    .patch(protect, updateBlogValidator, validateRequest, UpdateBlog)
    .delete(protect, deleteBlogValidator, validateRequest, DeleteBlog);