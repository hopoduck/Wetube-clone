import express from "express";
import { getHome, getLogin, getLogout, getSearch, getSignUp, getUpload, postLogin, postSignUp, postUpload } from "../controllers/globalController";
import { githubLogin, postGithubLogin } from "../controllers/userController";
import { onlyPrivate, onlyPublic, uploadVideo } from "../middlewares";
import routes from "../routes";
import passport from "passport";

export const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.search, getSearch);
globalRouter.get(routes.signUp, onlyPublic, getSignUp);
globalRouter.post(routes.signUp, onlyPublic, postSignUp, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, getLogout);
globalRouter.get(routes.upload, onlyPrivate, getUpload);
globalRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
globalRouter.get(routes.githubLogin, githubLogin);
globalRouter.get(routes.githubLoginCallback, passport.authenticate("github", { failureRedirect: routes.login }), postGithubLogin);

export default globalRouter;
