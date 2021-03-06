import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import { uploadVideo } from "../middlewares";

export const getHome = async (req, res) => {
  const videos = await Video.find({}).populate("creator");
  res.render("home", { pageTitle: "Home", videos });
};

export const getSearch = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getSignUp = (req, res) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};
export const postSignUp = async (req, res, next) => {
  const {
    body: { id, password, password2, name },
  } = req;
  if (password === password2) {
    // User create
    try {
      console.log(id, password, password2, name);
      const user = await User({
        id,
        name,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  } else {
    res.redirect(routes.signUp);
  }
};
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
export const getLogout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const filepath = path.split("src\\")[1];
  const newVideo = await Video.create({
    fileUrl: filepath,
    title,
    description,
    creator: req.user._id,
    creatorName: req.user.name,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videos + routes.videoDetail(newVideo._id));
};
