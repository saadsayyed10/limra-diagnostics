"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientService = exports.updatePatientService = exports.fetchSinglePatientService = exports.fetchEveryPatientsService = exports.fetchAllPatientsService = exports.registerOBSPatientService = exports.registerRegularPatientService = void 0;
const client_1 = require("@prisma/client");
const orm_1 = __importDefault(require("../../lib/orm"));
const registerRegularPatientService = (name, phone, age, address) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield orm_1.default.patients.findUnique({
        where: {
            phone,
        },
    });
    if (existing) {
        throw new Error("Patient account already exists");
    }
    const patient = yield orm_1.default.patients.create({
        data: {
            name,
            phone,
            age,
            address,
            patientType: client_1.PatientType.REGULAR,
        },
    });
    return patient;
});
exports.registerRegularPatientService = registerRegularPatientService;
const registerOBSPatientService = (name, phone, age, address, husband, livingBoys, livingGirls, aadharNumber, lastMenstural) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield orm_1.default.patients.findUnique({
        where: {
            phone,
        },
    });
    if (existing) {
        throw new Error("Patient account already exists");
    }
    const patient = yield orm_1.default.patients.create({
        data: {
            name,
            phone,
            age,
            address,
            patientType: client_1.PatientType.OBS,
            husband,
            livingBoys,
            livingGirls,
            aadharNumber,
            lastMenstural,
        },
    });
    return patient;
});
exports.registerOBSPatientService = registerOBSPatientService;
const fetchAllPatientsService = (patientType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.patients.findMany({
        where: {
            patientType,
        },
        orderBy: {
            name: "asc",
        },
    });
});
exports.fetchAllPatientsService = fetchAllPatientsService;
const fetchEveryPatientsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.patients.findMany({
        orderBy: {
            name: "asc",
        },
    });
});
exports.fetchEveryPatientsService = fetchEveryPatientsService;
const fetchSinglePatientService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.patients.findUnique({
        where: {
            id,
        },
    });
});
exports.fetchSinglePatientService = fetchSinglePatientService;
const updatePatientService = (id, name, phone, age, address, husband, aadharNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const patient = yield orm_1.default.patients.update({
        where: {
            id,
        },
        data: {
            name,
            phone,
            age,
            address,
            husband,
            aadharNumber,
        },
    });
    return patient;
});
exports.updatePatientService = updatePatientService;
const deletePatientService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.patients.delete({
        where: {
            id,
        },
    });
});
exports.deletePatientService = deletePatientService;
