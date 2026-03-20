import { Router } from "express";
import { newMessageGet, newMessagePost } from "../controllers/messageControllers.js";

const messageRouter = Router();

messageRouter.get("/new", newMessageGet);
messageRouter.post("/new", newMessagePost);

export default messageRouter;