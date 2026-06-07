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
exports.getClinicProfileService = exports.syncClinicUserService = void 0;
const orm_1 = __importDefault(require("../../lib/orm"));
const syncClinicUserService = (clerkId, name, email, profilePicUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield orm_1.default.clinic.findUnique({
        where: {
            clerkId,
        },
    });
    if (existing) {
        throw new Error("Clinic user with this account already exists");
    }
    const clinic = yield orm_1.default.clinic.create({
        data: {
            clerkId,
            name,
            email,
            profilePicUrl,
        },
    });
    return clinic;
});
exports.syncClinicUserService = syncClinicUserService;
const getClinicProfileService = (clerkId) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield orm_1.default.clinic.findUnique({
        where: {
            clerkId,
        },
    });
    return clinic;
});
exports.getClinicProfileService = getClinicProfileService;
