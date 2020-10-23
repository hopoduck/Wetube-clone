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
  userChangePassword: (id) => {
    if (id) {
      return "/" + id + "/change-password";
    } else {
      return "/:id/change-password";
    }
  },

  // OAuth
  githubLogin: "/auth/github",
  githubLoginCallback: "/auth/github/callback",

  // api
  api: "/api",
  apiView: (id) => {
    if (id) {
      return `/${id}/views`;
    } else {
      return "/:id/views";
    }
  },
  apiCommentAdd: (id) => {
    if (id) {
      return `/${id}/comment-add`;
    } else {
      return "/:id/comment-add";
    }
  },
  apiCommentDelete: (id) => {
    if (id) {
      return `/${id}/comment-delete`;
    } else {
      return "/:id/comment-delete";
    }
  },
};

export default routes;
