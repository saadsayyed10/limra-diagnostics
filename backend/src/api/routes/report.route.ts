import { Router } from "express";
import * as controllers from "../controllers/report.controller";
import { requireAuth } from "@clerk/express";

const reportRouter = Router();

reportRouter.post(
  "/generate",
  requireAuth(),
  controllers.generateReportController,
);

export default reportRouter;
