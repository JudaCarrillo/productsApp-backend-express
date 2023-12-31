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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const connection_1 = require("./connection");
const cors_1 = require("./middleware/cors");
class App {
    constructor({ ProductModel }) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.productRouter = new routes_1.ProductRouter(ProductModel);
        this.connection = new connection_1.Connection();
        this.appConnect();
        this.appMiddlewares();
        this.app.disable("x-powered-by");
        this.app.use((0, cors_1.corsMiddleware)());
        this.appRoutes();
        this.appListen();
    }
    appRoutes() {
        this.app.use("/api/products", this.productRouter.getRouter());
    }
    appListen() {
        this.app.listen(this.port, () => console.log(`Server running on port http://localhost:${this.port}`));
    }
    appMiddlewares() {
        this.app.use(express_1.default.json());
    }
    appConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.testConnection();
        });
    }
}
exports.App = App;
