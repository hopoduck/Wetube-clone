import express from "express";
import { postApiCommentAdd, postApiView } from "../controllers/apiContoller";
import { onlyPrivate, onlyPublic, uploadVideo } from "../middlewares";
import routes from "../routes";

export const apiRouter = express.Router();

apiRouter.post(routes.apiView(), postApiView);
apiRouter.post(routes.apiCommentAdd(), postApiCommentAdd);
// apiRouter.get(routes.signUp, onlyPublic, getSignUp);
// apiRouter.post(routes.signUp, onlyPublic, postSignUp, postLogin);
// apiRouter.get(routes.login, onlyPublic, getLogin);
// apiRouter.post(routes.login, onlyPublic, postLogin);
// apiRouter.get(routes.logout, onlyPrivate, getLogout);
// apiRouter.get(routes.upload, onlyPrivate, getUpload);
// apiRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

export default apiRouter;
