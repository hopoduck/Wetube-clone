import routes from "../routes";
import User from "../models/User";
import { uploadAvatar } from "../middlewares";

export const getUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const getUser = await User.findById(id);
  res.render("userDetail", { pageTitle: `${getUser.name} Profile`, getUser });
};

export const getUserEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  const getUser = await User.findById(id);
  if (String(getUser) === String(req.user)) {
    res.render("userEdit", { pageTitle: `Edit ${getUser.name} Profile`, getUser });
  } else {
    res.redirect(routes.home);
  }
};

export const postUserEdit = async (req, res) => {
  const {
    body: { name },
    params: { id },
    file: { path },
  } = req;
  const user = await User.findByIdAndUpdate(id, { name, avatarUrl: path });
  res.redirect(routes.users + routes.userDetail(id));
};
