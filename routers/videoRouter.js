import express from "express";
import { getVideoDelete, getVideoDetail, getVideoEdit, postVideoEdit } from "../controllers/videoController";
import routes from "../routes";

export const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(), getVideoDetail);
videoRouter.get(routes.videoEdit(), getVideoEdit);
videoRouter.post(routes.videoEdit(), postVideoEdit);
videoRouter.get(routes.videoDelete(), getVideoDelete);

export default videoRouter;
