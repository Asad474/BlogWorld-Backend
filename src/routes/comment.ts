import { Router } from "express";
import { 
    createCommentValidator,
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

const commentRouter = Router();

commentRouter.route('/:_id')
    .get(protect, getCommentValidator, validateRequest, getComments)
    .patch(protect, updateCommentValidator, validateRequest, updateComment)
    .delete(protect, getCommentValidator, validateRequest, deleteComment);

commentRouter.post('/', protect, createCommentValidator, validateRequest, createComment);

export default commentRouter;