import { Router } from "express";


const authRouter = Router();

authRouter.get("/sign-up", signUpUserGet);
authRouter.post("/sign-up", signUpUserPost);

export default authRouter;