import Video from "../models/Video";
import mongoose from "mongoose";
import { routes } from "../routes";

export const postApiView = async (req, res) => {
  const {
    params: { id },
  } = req;
  console.log(id);
  let video = await Video.findById(id);
  console.log(video);
  video.views += 1;
  video.save();
};
