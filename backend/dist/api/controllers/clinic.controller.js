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
exports.getClinicProfileController = exports.syncClinicUserController = void 0;
const clinicService = __importStar(require("../services/clinic.service"));
const express_1 = require("@clerk/express");
const syncClinicUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clerkId, name, email, profilePicUrl } = req.body;
    const data = { clerkId, name, email, profilePicUrl };
    if (!data) {
        let errorMessage = "Required fields are missing";
        console.log(errorMessage);
        return res.status(400).json({ error: errorMessage });
    }
    try {
        const clinic = yield clinicService.syncClinicUserService(clerkId, name, email, profilePicUrl);
        res.status(201).json({ message: "Clinic user synced to database", clinic });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
});
exports.syncClinicUserController = syncClinicUserController;
const getClinicProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            let errorMessage = "Unauthorized: Invalid token";
            console.log(errorMessage);
            return res.status(401).json({ error: errorMessage });
        }
        const clinic = yield clinicService.getClinicProfileService(userId);
        res.status(200).json({ clinic });
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({ error: error.message });
    }
});
exports.getClinicProfileController = getClinicProfileController;
