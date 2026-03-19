import "./env.js";
import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import connectPgSimple from "connect-pg-simple";
import pool from "./database/pool.js";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";
import membershipRouter from "./routes/membershipRouter.js";

const app = express();
const PgSession = connectPgSimple(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "sessions",
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  }}));
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username, password, done) => {

  })
);

passport.serializeUser();

passport.deserializeUser();

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.use("/auth", authRouter);
app.use("/membership", membershipRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("Listening on port " + PORT);
});