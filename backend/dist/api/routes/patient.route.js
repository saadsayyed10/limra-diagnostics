"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller = __importStar(require("../controllers/patient.controller"));
const express_2 = require("@clerk/express");
const patientRouter = (0, express_1.Router)();
patientRouter.post("/register/regular", (0, express_2.requireAuth)(), controller.registerRegularPatientController);
patientRouter.post("/register/obs", (0, express_2.requireAuth)(), controller.registerOBSPatientController);
patientRouter.get("/all", (0, express_2.requireAuth)(), controller.fetchAllPatientsController);
patientRouter.get("/every", (0, express_2.requireAuth)(), controller.fetchEveryPatientsController);
patientRouter.get("/:id", (0, express_2.requireAuth)(), controller.fetchSinglePatientServiceController);
patientRouter.delete("/delete/:id", (0, express_2.requireAuth)(), controller.deletePatientController);
patientRouter.put("/update/:id", (0, express_2.requireAuth)(), controller.updatePatientController);
exports.default = patientRouter;
