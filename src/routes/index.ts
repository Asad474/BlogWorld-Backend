import { Express } from "express";
import blogRouter from "./blog";
import userRouter from "./user";
import commentRouter from "./comment";

const setUpRoutes = (app: Express)  => {
    app.use('/user', userRouter);
    app.use('/blog', blogRouter);
    app.use('/comment', commentRouter);
};

export default setUpRoutes;