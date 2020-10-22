import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";
import passport from "passport";

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

// github OAuth Login
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id = login, name, githubId = id, avatar_url },
  } = profile;
  console.log(id, name, githubId, avatar_url);
  console.log(profile);
  try {
    const user = await User.findOne({ id });
    if (user) {
      user.githubId = githubId;
      user.avatarUrl = avatar_url;
      user.name = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      id,
      name,
      githubId,
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
