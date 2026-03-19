import { Router } from "express";


const userRouter = Router();

userRouter.get("/sign-up", signUpUserGet);
userRouter.post("/sign-up", signUpUserPost);

export default userRouter;