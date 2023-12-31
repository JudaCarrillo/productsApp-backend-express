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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../models/product.model");
const products_1 = require("../schemas/products");
class ProductController {
    constructor(productModel) {
        this.getProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allProducts = yield product_model_1.ProductModel.getAll();
                return res.json(allProducts);
            }
            catch (error) {
                console.error("Error en getProducts:", error);
                return res.status(500).json({ error: "Error interno del servidor" });
            }
        });
        this.getProductById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield product_model_1.ProductModel.getProductById(id);
                if (product !== null) {
                    return res.json(product);
                }
                else {
                    return res.status(404).json({
                        msg: `There isn't a product with id ${id}`,
                    });
                }
            }
            catch (error) {
                console.error("Error in getProductsById:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const isRemoved = yield product_model_1.ProductModel.deleteProduct(id);
                if (isRemoved)
                    res.json({ msg: `Product successfully removed` });
                else {
                    res.status(404).json({
                        msg: `There isn't product with id ${id}`,
                    });
                }
            }
            catch (error) {
                console.error("Error en getProducts:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = (0, products_1.validateProduct)(req.body);
            if (!result.success) {
                return res.status(422).json({ error: JSON.parse(result.error.message) });
            }
            try {
                const newProduct = yield product_model_1.ProductModel.createProduct(result.data);
                return res.json(newProduct);
            }
            catch (error) {
                console.error("Error en getProducts:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = (0, products_1.validatePartialProduct)(req.body);
            if (!result.success) {
                return res.status(422).json({ error: JSON.parse(result.error.message) });
            }
            try {
                const updatedProduct = yield product_model_1.ProductModel.updateProduct(id, result.data);
                return res.json(updatedProduct);
            }
            catch (error) {
                console.error("Error en getProducts:", error);
                return res.status(500).json({ error: "Internal server error" });
            }
        });
        this.productModel = new productModel();
    }
}
exports.ProductController = ProductController;
