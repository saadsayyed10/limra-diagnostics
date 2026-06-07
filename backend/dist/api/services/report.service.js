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
exports.fetchAllReportsService = exports.generateReportService = void 0;
const orm_1 = __importDefault(require("../../lib/orm"));
const generateReportService = (scanType, findings, docxUrl, patientId, doctorName) => __awaiter(void 0, void 0, void 0, function* () {
    const report = yield orm_1.default.reports.create({
        data: {
            scanType,
            findings,
            docxUrl,
            patientId,
            doctorName,
        },
    });
    return report;
});
exports.generateReportService = generateReportService;
const fetchAllReportsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.reports.findMany({
        select: {
            id: true,
            scanType: true,
            docxUrl: true,
            doctorName: true,
            patients: {
                select: {
                    name: true,
                    patientType: true,
                },
            },
            createdAt: true,
        },
    });
});
exports.fetchAllReportsService = fetchAllReportsService;
