import { Router } from "express";
import clinicRouter from "./clinic.route";
import patientRouter from "./patient.route";
import billRouter from "./bill.route";

const mainRouter = Router();

mainRouter.use("/clinic", clinicRouter);
mainRouter.use("/patient", patientRouter);
mainRouter.use("/bill", billRouter);

export default mainRouter;
