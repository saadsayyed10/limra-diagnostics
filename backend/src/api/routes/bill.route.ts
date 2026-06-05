import { Router } from "express";
import * as controllers from "../controllers/bill.controller";
import { requireAuth } from "@clerk/express";

const billRouter = Router();

billRouter.post("/generate", requireAuth(), controllers.generateBillController);

billRouter.get("/all", requireAuth(), controllers.fetchAllBillsController);
billRouter.get("/:id", requireAuth(), controllers.fetchSingleBillController);

billRouter.put("/update/:id", requireAuth(), controllers.updateBillController);

export default billRouter;
