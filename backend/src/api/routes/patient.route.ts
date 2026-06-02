import { Router } from "express";
import * as controller from "../controllers/patient.controller";
import { requireAuth } from "@clerk/express";

const patientRouter = Router();

patientRouter.post(
  "/register/regular",
  requireAuth(),
  controller.registerRegularPatientController,
);
patientRouter.post(
  "/register/obs",
  requireAuth(),
  controller.registerOBSPatientController,
);

patientRouter.get("/all", controller.fetchAllPatientsController);

export default patientRouter;
