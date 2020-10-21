import express from "express";
import { getVideoDetail, getVideoEdit } from "../controllers/videoController";
import routes from "../routes";

export const videoRouter = express.Router();

videoRouter.get(routes.videoDetail(), getVideoDetail);
videoRouter.get(routes.videoEdit(), getVideoEdit);
// videoRouter.get("/videos/:id", getVideoDetail);

export default videoRouter;
