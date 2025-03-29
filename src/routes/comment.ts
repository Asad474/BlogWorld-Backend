import { Router } from "express";
import {
  createCommentValidator,
  deleteCommentValidator,
  updateCommentValidator,
} from "../validators";
import { protect, validateRequest } from "../middleware";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/comment";

const commentRouter = Router();

commentRouter
  .route("/:_id")
  .patch(protect, updateCommentValidator, validateRequest, updateComment)
  .delete(protect, deleteCommentValidator, validateRequest, deleteComment);

commentRouter.post(
  "/",
  protect,
  createCommentValidator,
  validateRequest,
  createComment
);

export default commentRouter;
