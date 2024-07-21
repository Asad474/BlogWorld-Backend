import { Express } from "express";
import blogRouter from "./blog";
import userRouter from "./user";
import commentRouter from "./comment";

const routes = [
    { path: '/user', router: userRouter },
    { path: '/blog', router: blogRouter },
    { path: '/comment', router: commentRouter },
];

const setUpRoutes = (app: Express) => {
    routes.forEach(route => {
        app.use(route.path, route.router);
    });
};

export default setUpRoutes;