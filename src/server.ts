import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { DBConnection } from "./config";
import { blogRouter, commentRouter, userRouter } from "./routes";
import { ErrorHandler, NotFoundHandler } from "./middleware";

const app: Express = express();
const port = process.env.PORT || 8000;

DBConnection();

app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send('Blog API');
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);


app.use(NotFoundHandler);
app.use(ErrorHandler);

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});