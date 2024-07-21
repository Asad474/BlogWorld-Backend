import { Router } from "express";
import { GetUserInfo, Login, Logout, Register, UpdateUserInfo } from "../controllers";
import { protect, UploadFile, validateRequest } from "../middleware";
import { 
    registerValidation,
    loginValidation,
    getDetailsValidation,
    updateDetailsValidation,
} from "../utils";

const userRouter = Router();

userRouter.post(
    '/register', 
    registerValidation, 
    validateRequest,
    Register
);

userRouter.post(
    '/login',
    loginValidation,
    validateRequest,
    Login
);

userRouter.post('/logout', Logout);

userRouter.route('/')
    .get(protect, getDetailsValidation, validateRequest, GetUserInfo)
    .patch(protect, updateDetailsValidation, validateRequest, UploadFile('dp'), UpdateUserInfo);

export default userRouter;    