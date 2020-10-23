import routes from "./routes";
import multer from "multer";
import path from "path";

export const localsMiddleware = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.siteName = "Youtube";
  res.locals.user = req.user;
  console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (res.locals.user === undefined) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
export const onlyPrivate = (req, res, next) => {
  if (res.locals.user !== undefined) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

const multerVideo = multer({ dest: "src/uploads/videos/" });
const multerAvatar = multer({ dest: "src/uploads/avatars/" });

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
