import { Router } from "express";

const membershipRouter = Router();

membershipRouter.get("/join", joinClubGet);
membershipRouter.post("/join", joinClubPost);

export default membershipRouter;