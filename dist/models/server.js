"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes/routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        this.routes = new routes_1.Routes();
        this.setupRoutes();
        this.listen();
    }
    setupRoutes() {
        this.app.use("/api/productos", this.routes.router);
        // this.app.use("/api/productos", this.routes.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
exports.Server = Server;
