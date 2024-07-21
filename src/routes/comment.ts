import { Router } from "express";
import { 
    createCommentValidator, 
    deleteCommentValidator, 
    getCommentValidator, 
    updateCommentValidator 
} from "../utils";
import { protect, validateRequest } from "../middleware";
import { 
    createComment, 
    deleteComment, 
    getComments, 
    updateComment 
} from "../controllers/comment";

export const commentRouter = Router()

commentRouter.route('/:_id')
    .get(protect, getCommentValidator, validateRequest, getComments)
    .patch(protect, updateCommentValidator, validateRequest, updateComment)
    .delete(protect, deleteCommentValidator, validateRequest, deleteComment);

commentRouter.post('/', protect, createCommentValidator, validateRequest, createComment);