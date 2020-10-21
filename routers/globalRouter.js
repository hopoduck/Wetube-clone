import express from "express";
import { getHome, getLogin, getLogout, getSignUp, getUpload, postLogin, postSignUp, postUpload } from "../controllers/globalController";
import { onlyPrivate, onlyPublic, uploadVideo } from "../middlewares";
import routes from "../routes";

export const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.signUp, onlyPublic, getSignUp);
globalRouter.post(routes.signUp, onlyPublic, postSignUp, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, getLogout);
globalRouter.get(routes.upload, onlyPrivate, getUpload);
globalRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

export default globalRouter;
