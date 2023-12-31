"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
class ProductRouter {
    constructor(productModel) {
        this.productsRouter = (0, express_1.Router)();
        this.productController = new product_controller_1.ProductController(productModel);
        this.createRoutes();
    }
    createRoutes() {
        // get's
        this.productsRouter.get("/:id", this.productController.getProductById);
        this.productsRouter.get("/", this.productController.getProducts);
        // delete
        this.productsRouter.delete("/:id", this.productController.delete);
        // post
        this.productsRouter.post("/", this.productController.create);
        // update
        this.productsRouter.put("/:id", this.productController.update);
    }
    getRouter() {
        return this.productsRouter;
    }
}
exports.ProductRouter = ProductRouter;
