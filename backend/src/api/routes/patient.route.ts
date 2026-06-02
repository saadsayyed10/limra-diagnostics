import { Router } from "express";
import * as controller from "../controllers/patient.controller";

const patientRouter = Router();

patientRouter.post(
  "/register/regular",
  controller.registerRegularPatientController,
);
patientRouter.post("/register/obs", controller.registerOBSPatientController);

export default patientRouter;
