import express from "express";
import { getHome, getLogin, getSignUp, postLogin } from "../controllers/globalController";
import routes from "../routes";

export const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.signUp, getSignUp);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

export default globalRouter;
