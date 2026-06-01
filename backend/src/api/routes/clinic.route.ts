import { Router } from "express";
import * as controllers from "../controllers/clinic.controller";

const clinicRouter = Router();

clinicRouter.post("/account/sync", controllers.syncClinicUserController);

export default clinicRouter;
