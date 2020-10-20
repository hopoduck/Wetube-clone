const routes = {
  // global
  home: "/",
  signUp: "/sign-up",
  login: "/login",
  upload: "/upload",

  // videos
  videos: "/videos",
  videoDetail: "/videos/:id",
  videoEdit: "/videos/:id/edit",
  videoDelete: "/videos/:id/delete",

  // users
  users: "/users",
  userDetail: "/users/:id",
  userEdit: "/users/:id/edit",

  // OAuth
  githubLogin: '/auth/github',
  githubLoginCallback: '/auth/github/callback',

  // api
  api: '/api'
};

export default routes;
