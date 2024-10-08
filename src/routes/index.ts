import { Express, Router } from "express";
import blogRouter from "./blog";
import userRouter from "./user";
import commentRouter from "./comment";

const routes: { path: string, router: Router }[] = [
    { path: 'user', router: userRouter },
    { path: 'blog', router: blogRouter },
    { path: 'comment', router: commentRouter },
];

const setUpRoutes = (app: Express) => {
    routes.forEach(route => {
        app.use(`/api/${route.path}`, route.router);
    });
};

export default setUpRoutes;