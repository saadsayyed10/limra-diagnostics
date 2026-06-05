import { Router } from "express";
import * as controllers from "../controllers/bill.controller";

const billRouter = Router();

billRouter.post("/generate", controllers.generateBillController);

export default billRouter;
