import { Router } from "express";
import * as controllers from "../controllers/report.controller";

const reportRouter = Router();

reportRouter.post("/generate", controllers.generateReportController);

export default reportRouter;
