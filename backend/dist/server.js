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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./config/env.config");
const db_config_1 = require("./config/db.config");
const index_route_1 = __importDefault(require("./api/routes/index.route"));
const express_2 = require("@clerk/express");
const app = (0, express_1.default)();
const PORT = env_config_1.ENV.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_2.clerkMiddleware)());
app.use("/api", index_route_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_config_1.connectToDB)();
    app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}`);
    });
});
startServer();
