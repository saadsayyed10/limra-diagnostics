import { Router } from "express";
import clinicRouter from "./clinic.route";
import patientRouter from "./patient.route";
import billRouter from "./bill.route";
import reportRouter from "./report.route";

const mainRouter = Router();

mainRouter.use("/clinic", clinicRouter);
mainRouter.use("/patient", patientRouter);
mainRouter.use("/bill", billRouter);
mainRouter.use("/report", reportRouter);

export default mainRouter;
