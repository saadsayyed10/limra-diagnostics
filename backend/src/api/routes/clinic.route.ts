import { Router } from "express";
import * as controllers from "../controllers/clinic.controller";
import { requireAuth } from "@clerk/express";

const clinicRouter = Router();

clinicRouter.post("/account/sync", controllers.syncClinicUserController);

clinicRouter.get(
  "/account",
  requireAuth(),
  controllers.syncClinicUserController,
);

export default clinicRouter;
