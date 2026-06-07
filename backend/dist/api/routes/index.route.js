"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinic_route_1 = __importDefault(require("./clinic.route"));
const patient_route_1 = __importDefault(require("./patient.route"));
const bill_route_1 = __importDefault(require("./bill.route"));
const report_route_1 = __importDefault(require("./report.route"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/clinic", clinic_route_1.default);
mainRouter.use("/patient", patient_route_1.default);
mainRouter.use("/bill", bill_route_1.default);
mainRouter.use("/report", report_route_1.default);
exports.default = mainRouter;
