import { Router } from "express";
import clinicRouter from "./clinic.route";
import patientRouter from "./patient.route";

const mainRouter = Router();

mainRouter.use("/clinic", clinicRouter);
mainRouter.use("/patient", patientRouter);

export default mainRouter;
