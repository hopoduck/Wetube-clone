import routes from "../routes";

export const getHome = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const getSignUp = (req, res) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};
export const postLogin = (req, res) => {
  const {
    body: { id, password },
  } = req;
  console.log(id, password);
  res.redirect(routes.home);
};
