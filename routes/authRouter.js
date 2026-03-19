import { Router } from "express";
import { logInGet, logInPost, signUpGet, signUpPost } from "../controllers/authControllers.js";


const authRouter = Router();

authRouter.get("/sign-up", signUpGet);
authRouter.post("/sign-up", signUpPost);

authRouter.get("/log-in", logInGet);
authRouter.post("/log-in", logInPost)

export default authRouter;