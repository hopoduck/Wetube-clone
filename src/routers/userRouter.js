import express from "express";
import { getUserChangePassword, getUserDetail, getUserEdit, postUserChangePassword, postUserEdit } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

export const userRouter = express.Router();

userRouter.get(routes.userDetail(), getUserDetail);
userRouter.get(routes.userEdit(), onlyPrivate, getUserEdit);
userRouter.post(routes.userEdit(), onlyPrivate, uploadAvatar, postUserEdit);
userRouter.get(routes.userChangePassword(), onlyPrivate, getUserChangePassword);
userRouter.post(routes.userChangePassword(), onlyPrivate, postUserChangePassword);

export default userRouter;
