import "./env.js";
import express from "express";
import passport from "passport";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";
import membershipRouter from "./routes/membershipRouter.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { setupPassport } from "./config/passport.js";
import { setupSession } from "./config/session.js";
import { userCredentialsToLocalsHandler } from "./middlewares/localsMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(setupSession());
app.use(passport.session());

setupPassport();

app.use(userCredentialsToLocalsHandler);

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/messages", messageRouter);
app.use("/auth", authRouter);
app.use("/membership", membershipRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log("Listening on port " + PORT);
});