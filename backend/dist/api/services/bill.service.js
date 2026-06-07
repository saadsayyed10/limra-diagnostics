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
exports.deleteBillService = exports.updateBillService = exports.fetchSingleBillService = exports.fetchAllBillsService = exports.generateBillService = void 0;
const orm_1 = __importDefault(require("../../lib/orm"));
const generateBillService = (scanType, totalAmount, dueAmount, concession, docxUrl, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.bills.create({
        data: {
            scanType,
            totalAmount,
            dueAmount,
            concession,
            docxUrl,
            patientId,
        },
    });
});
exports.generateBillService = generateBillService;
const fetchAllBillsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.bills.findMany({
        select: {
            id: true,
            scanType: true,
            totalAmount: true,
            dueAmount: true,
            concession: true,
            docxUrl: true,
            createdAt: true,
            patients: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    patientType: true,
                },
            },
        },
        orderBy: {
            patients: {
                name: "asc",
            },
        },
    });
});
exports.fetchAllBillsService = fetchAllBillsService;
const fetchSingleBillService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.bills.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            scanType: true,
            totalAmount: true,
            dueAmount: true,
            concession: true,
            docxUrl: true,
            createdAt: true,
            patients: {
                select: {
                    id: true,
                    name: true,
                    phone: true,
                    patientType: true,
                },
            },
        },
    });
});
exports.fetchSingleBillService = fetchSingleBillService;
const updateBillService = (id, scanType, totalAmount, dueAmount, concession, docxUrl, patientId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.bills.update({
        where: {
            id,
        },
        data: {
            scanType,
            totalAmount,
            dueAmount,
            concession,
            docxUrl,
            patientId,
        },
    });
});
exports.updateBillService = updateBillService;
const deleteBillService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield orm_1.default.bills.delete({
        where: {
            id,
        },
    });
});
exports.deleteBillService = deleteBillService;
