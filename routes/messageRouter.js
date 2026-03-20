import { Router } from "express";
import { deleteMessageGet, newMessageGet, newMessagePost } from "../controllers/messageControllers.js";

const messageRouter = Router();

messageRouter.get("/new", newMessageGet);
messageRouter.post("/new", newMessagePost);
messageRouter.get("/:messageId/delete", deleteMessageGet);

export default messageRouter;