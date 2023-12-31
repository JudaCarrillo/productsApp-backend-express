"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialProduct = exports.validateProduct = void 0;
const zod_1 = __importDefault(require("zod"));
const productSchema = zod_1.default.object({
    name: zod_1.default.string({
        invalid_type_error: "Product name must be a string",
        required_error: "Product name is required",
    }),
    description: zod_1.default.string({
        invalid_type_error: "Product description must be a string",
    }),
    price: zod_1.default.number().positive(),
    stock: zod_1.default.number().positive().min(0),
});
function validateProduct(input) {
    return productSchema.safeParse(input);
}
exports.validateProduct = validateProduct;
function validatePartialProduct(input) {
    return productSchema.partial().safeParse(input);
}
exports.validatePartialProduct = validatePartialProduct;
