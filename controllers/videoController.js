import Video from "../models/Video";
import mongoose from "mongoose";
import { routes } from "../routes";

export const getVideoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  console.log(id, video);
  res.render("videoDetail", { pageTitle: video.title, video });
};

export const getVideoEdit = async (req, res) => {
  if (req.user._id === video.creator) {
    console.log(req.user._id, video.creator);
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    res.render("videoEdit", { pageTitle: `Edit ${video.title}`, video });
  } else {
    res.redirect(routes.home);
  }
};
