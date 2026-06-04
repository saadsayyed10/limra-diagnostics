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

patientRouter.get("/:id", controller.fetchSinglePatientServiceController);

patientRouter.delete(
  "/delete/:id",
  requireAuth(),
  controller.deletePatientController,
);

patientRouter.put(
  "/update/:id",
  requireAuth(),
  controller.updatePatientController,
);

export default patientRouter;
