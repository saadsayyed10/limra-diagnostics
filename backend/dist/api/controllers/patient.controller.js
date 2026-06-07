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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientController = exports.deletePatientController = exports.fetchSinglePatientServiceController = exports.fetchEveryPatientsController = exports.fetchAllPatientsController = exports.registerOBSPatientController = exports.registerRegularPatientController = void 0;
const patientService = __importStar(require("../services/patient.service"));
const express_1 = require("@clerk/express");
const registerRegularPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, age, address } = req.body;
    const data = { name, phone, age, address };
    if (!data) {
        let errorMessage = "Required fields are missing";
        console.log(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Please login to register regular patient";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.registerRegularPatientService(name, phone, age, address);
        res.status(201).json({ message: "Regular patient registered", patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.registerRegularPatientController = registerRegularPatientController;
const registerOBSPatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, age, address, husband, livingBoys, livingGirls, aadharNumber, lastMenstural, } = req.body;
    const data = {
        name,
        phone,
        age,
        address,
        husband,
        livingBoys,
        livingGirls,
        aadharNumber,
        lastMenstural,
    };
    if (!data) {
        let errorMessage = "Required fields are missing";
        console.log(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Please login to register obs patient";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.registerOBSPatientService(name, phone, age, address, husband, livingBoys, livingGirls, aadharNumber, lastMenstural);
        res.status(201).json({ message: "OBS patient registered", patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.registerOBSPatientController = registerOBSPatientController;
const fetchAllPatientsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientType } = req.query;
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Invalid token";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.fetchAllPatientsService(patientType);
        res.status(200).json({ total: patient.length, patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.fetchAllPatientsController = fetchAllPatientsController;
const fetchEveryPatientsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Invalid token";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.fetchEveryPatientsService();
        res.status(200).json({ total: patient.length, patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.fetchEveryPatientsController = fetchEveryPatientsController;
const fetchSinglePatientServiceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Invalid token";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.fetchSinglePatientService(id);
        res.status(200).json({ patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.fetchSinglePatientServiceController = fetchSinglePatientServiceController;
const deletePatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Invalid token";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.deletePatientService(id);
        res.status(204).json({ message: "Deleted patient account", patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.deletePatientController = deletePatientController;
const updatePatientController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        let errorMessage = "ID not found in params";
        console.log(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
    const { name, phone, age, address, husband, aadharNumber } = req.body;
    const data = {
        name,
        phone,
        age,
        address,
        husband,
        aadharNumber,
    };
    if (!data) {
        let errorMessage = "Required fields are missing";
        console.log(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Please login to register obs patient";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const patient = yield patientService.updatePatientService(id, name, phone, age, address, husband, aadharNumber);
        res.status(200).json({ message: "Patient updated", patient });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.updatePatientController = updatePatientController;
