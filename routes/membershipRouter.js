import { Router } from "express";
import { joinClubGet, joinClubPost } from "../controllers/membershipController.js";

const membershipRouter = Router();

membershipRouter.get("/join", joinClubGet);
membershipRouter.post("/join", joinClubPost);

export default membershipRouter;