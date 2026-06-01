import { Router } from "express";
import clinicRouter from "./clinic.route";

const mainRouter = Router();

mainRouter.use("/clinic", clinicRouter);

export default mainRouter;
