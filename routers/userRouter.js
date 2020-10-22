import express from "express";
import { getUserDetail, getUserEdit, postUserEdit } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

export const userRouter = express.Router();

userRouter.get(routes.userDetail(), getUserDetail);
userRouter.get(routes.userEdit(), onlyPrivate, getUserEdit);
userRouter.post(routes.userEdit(), onlyPrivate, uploadAvatar, postUserEdit);

export default userRouter;
