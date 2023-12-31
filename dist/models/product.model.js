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
exports.ProductModel = void 0;
const connection_1 = require("../connection");
const sequelize_1 = require("sequelize");
class ProductModel {
    constructor() {
        this.insConnection = new connection_1.Connection();
        this.createProductModel();
    }
    createProductModel() {
        const sequelize = this.insConnection.exportSequelize();
        ProductModel.product = sequelize.define("products", {
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL,
            },
            stock: {
                type: sequelize_1.DataTypes.INTEGER,
            },
        }, {
            createdAt: false,
            updatedAt: false,
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ProductModel.product.findAll();
                return result;
            }
            catch (error) {
                console.error("Error in getProducts:", error);
                throw error;
            }
        });
    }
    static getProductById(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/[^\d]/.test(idProduct)) {
                throw new Error(`Invalid product id: ${idProduct}`);
            }
            try {
                const product = yield ProductModel.product.findByPk(idProduct);
                if (!product) {
                    throw new Error(`Product with id ${idProduct} not found`);
                }
                return product;
            }
            catch (error) {
                console.error("Error in getProductById:", error);
                throw error;
            }
        });
    }
    static deleteProduct(idProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/[^\d]/.test(idProduct)) {
                throw new Error(`Invalid product id: ${idProduct}`);
            }
            try {
                const product = yield ProductModel.getProductById(idProduct);
                if (!product) {
                    return false;
                }
                yield ProductModel.product.destroy({
                    where: {
                        id: idProduct,
                    },
                });
                return true;
            }
            catch (error) {
                console.error("Error in deleteProduct:", error);
                throw error;
            }
        });
    }
    static createProduct(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield ProductModel.product.create(body);
                return newProduct;
            }
            catch (error) {
                console.error("Error in createProduct:", error);
                throw error;
            }
        });
    }
    static updateProduct(idProduct, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/[^\d]/.test(idProduct)) {
                throw new Error(`Invalid product id: ${idProduct}`);
            }
            try {
                const existingProduct = yield ProductModel.product.findByPk(idProduct);
                if (!existingProduct) {
                    throw new Error(`Product with id ${idProduct} not found`);
                }
                yield ProductModel.product.update(body, {
                    where: {
                        id: idProduct,
                    },
                });
                const updatedProduct = yield ProductModel.product.findByPk(idProduct);
                return updatedProduct;
            }
            catch (error) {
                console.error("Error in updateProduct:", error);
                throw error;
            }
        });
    }
}
exports.ProductModel = ProductModel;
