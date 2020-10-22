import "core-js";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import { globalRouter } from "./routers/globalRouter";
// import globalRouter from "./routers/globalRouter";
// import userRouter from "./routers/userRouter";
// import videoRouter from "./routers/videoRouter";
// import apiRouter from "./routers/apiRouter";

import "./passport";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import userRouter from "./routers/userRouter";

dotenv.config();

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet({ contentSecurityPolicy: false }));
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/favicon.ico", express.static("./favicon.ico"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json()); // 모든 라우터에 적용되는 함수
app.use(bodyParser.urlencoded({ extended: true })); // 모든 라우터에 적용되는 함수
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);
app.use(routes.users, userRouter);
app.use(routes.api, apiRouter);

export default app;
