import { Router } from "express";
import * as controllers from "../controllers/bill.controller";
import { requireAuth } from "@clerk/express";

const billRouter = Router();

billRouter.post("/generate", requireAuth(), controllers.generateBillController);

export default billRouter;
