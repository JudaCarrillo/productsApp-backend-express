"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const product_model_1 = require("./models/product.model");
// we configure the variables of ambient
dotenv_1.default.config();
const server = new app_1.App({ ProductModel: product_model_1.ProductModel });