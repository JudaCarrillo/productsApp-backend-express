"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const ACCEPTED_ORIGINS = [
    "http://localhost:4200",
    "http://localhost/8080",
    "https://productsapp-frontend.netlify.app",
];
const corsMiddleware = (acceptedOrigins = ACCEPTED_ORIGINS) => {
    return (0, cors_1.default)({
        origin: (origin, callback) => {
            if (acceptedOrigins.includes(origin) || !origin) {
                return callback(null, true);
            }
            console.log(origin);
            return callback(new Error("Not allowed by CORS"));
        },
    });
};
exports.corsMiddleware = corsMiddleware;
