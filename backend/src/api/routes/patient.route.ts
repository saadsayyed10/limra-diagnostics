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

patientRouter.get("/all", requireAuth(), controller.fetchAllPatientsController);

patientRouter.delete(
  "/delete/:id",
  requireAuth(),
  controller.deletePatientController,
);

patientRouter.delete("/update/:id", controller.updatePatientController);

export default patientRouter;
