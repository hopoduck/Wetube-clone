const routes = {
  // global
  home: "/",
  signUp: "/sign-up",
  login: "/login",
  logout: "/logout",

  // videos
  upload: "/upload",
  videos: "/videos",
  videoDetail: (id) => {
    if (id) {
      return "/" + id;
    } else {
      return "/:id";
    }
  },
  videoEdit: (id) => {
    if (id) {
      return "/" + id + "/edit";
    } else {
      return "/:id/edit";
    }
  },
  videoDelete: (id) => {
    if (id) {
      return "/" + id + "/delete";
    } else {
      return "/:id/delete";
    }
  },

  // users
  users: "/users",
  userDetail: (id) => {
    if (id) {
      return "/" + id;
    } else {
      return "/:id";
    }
  },
  userEdit: (id) => {
    if (id) {
      return "/" + id + "/edit";
    } else {
      return "/:id/edit";
    }
  },

  // OAuth
  githubLogin: "/auth/github",
  githubLoginCallback: "/auth/github/callback",

  // api
  api: "/api",
};

export default routes;
