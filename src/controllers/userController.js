import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import passport from "passport";
import { Error } from "mongoose";

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const getUser = await User.findById(id);
  const videos = await Video.find({ creator: id }).populate("creator");
  res.render("userDetail", { pageTitle: `${getUser.name} Profile`, getUser, videos });
};

export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const getUser = await User.findById(id);
  if (String(getUser) === String(req.user)) {
    res.render("userEdit", {
      pageTitle: `Edit ${getUser.name} Profile`,
      getUser,
    });
  } else {
    res.redirect(routes.home);
  }
};

export const postUserEdit = async (req, res) => {
  try {
    const {
      body: { name },
      params: { id },
      file: { path },
    } = req;
    const user = await User.findByIdAndUpdate(id, { name, avatarUrl: path });
    res.redirect(routes.users + routes.userDetail(id));
  } catch (error) {
    const {
      body: { name },
      params: { id },
    } = req;
    const user = await User.findByIdAndUpdate(id, { name });
    res.redirect(routes.users + routes.userDetail(id));
  }
};

// Change Password
export const getUserChangePassword = async (req, res) => {
  const {
    params: { id },
  } = req;
  const getUser = await User.findById(id);
  // console.log(String(getUser._id), String(req.user._id));
  if (String(getUser._id) === String(req.user._id)) {
    res.render("changePassword", { pageTitle: `Change Password`, getUser });
  } else {
    res.redirect(routes.home);
  }
};

export const postUserChangePassword = async (req, res) => {
  const {
    params: { id },
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      throw "error";
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.users + routes.userDetail(id));
    }
  } catch (error) {
    res.redirect(routes.users + routes.userDetail(id));
  }
};

// github OAuth Login
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { login, name, id, avatar_url },
  } = profile;
  try {
    const user = await User.findOne({ id });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatar_url;
      user.name = name;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      id: login,
      name,
      githubId: id,
      avatarUrl: avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
