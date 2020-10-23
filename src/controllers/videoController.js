import Video from "../models/Video";
import User from "../models/User";
import routes from "../routes";
import fs from "fs";

export const getVideoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id)
    .populate("comments")
    .populate("creator");
  console.log(video);
  res.render("videoDetail", { pageTitle: video.title, video });
};

export const getVideoEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (String(req.user._id) === String(video.creator)) {
    console.log(req.user._id, video.creator);
    res.render("videoEdit", { pageTitle: `Edit ${video.title}`, video });
  } else {
    res.redirect(routes.home);
  }
};

export const postVideoEdit = async (req, res) => {
  const {
    body: { title, description },
    params: { id },
  } = req;
  try {
    const video = await Video.findByIdAndUpdate(id, { title, description });
    res.redirect(routes.videos + routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getVideoDelete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findByIdAndRemove(id);
    const user = await User.findById(video.creator);
    if (String(video.creator) === String(user._id)) {
      const deleteVideo = user.videos.findIndex((e) => String(e) === String(id));
      user.videos.splice(deleteVideo);
      user.save();
      fs.unlink(video.fileUrl, (error) => {
        if (error) {
          throw error;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
