import { Router } from "express";
import { mainPageGet } from "../controllers/indexControllers.js";


const indexRouter = Router();

indexRouter.get("/", mainPageGet);

export default indexRouter;